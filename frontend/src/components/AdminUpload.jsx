import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosClient from "../utils/axiosClient";

function AdminUpload() {
  const { problemId } = useParams();

  const [problemTitle, setProblemTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const selectedFile = watch("videoFile")?.[0];

  // Fetch problem title (for clarity)
  useEffect(() => {
    async function fetchProblemTitle() {
      try {
        const res = await axiosClient.get(
          `/problem/problemById/${problemId}`
        );
        setProblemTitle(res.data.title);
      } catch (err) {
        console.error("Failed to fetch problem title");
      }
    }
    fetchProblemTitle();
  }, [problemId]);

  // Upload handler
  const onSubmit = async (data) => {
    const file = data.videoFile[0];

    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      // Step 1: Get Cloudinary signature
      const signatureRes = await axiosClient.get(
        `/video/create/${problemId}`
      );

      const {
        signature,
        timestamp,
        public_id,
        api_key,
        upload_url,
      } = signatureRes.data;

      // Step 2: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("public_id", public_id);
      formData.append("api_key", api_key);

      const uploadRes = await axios.post(upload_url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadRes.data;

      // Step 3: Save metadata
      const metadataRes = await axiosClient.post("/video/save", {
        problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataRes.data.videoSolution);
      reset();
    } catch (err) {
      setError("root", {
        type: "manual",
        message:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-120 flex items-center justify-center text-white">
      <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(157,0,255,0.25)] p-6">
        <h2 className="text-2xl font-bold text-purple-300 mb-1">
          Upload Editorial Video
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          For problem:{" "}
          <span className="text-white font-semibold">
            {problemTitle || "Loading..."}
          </span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Input */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Choose video file (max 100MB)
            </label>
            <input
              type="file"
              accept="video/*"
              {...register("videoFile", {
                required: "Please select a video file",
                validate: {
                  isVideo: (files) =>
                    files?.[0]?.type.startsWith("video/") ||
                    "Please select a valid video file",
                  fileSize: (files) =>
                    files?.[0]?.size <= 100 * 1024 * 1024 ||
                    "File size must be less than 100MB",
                },
              })}
              className="file-input file-input-bordered w-full bg-black border-white/20"
              disabled={uploading}
            />
            {errors.videoFile && (
              <p className="text-xs text-red-400 mt-1">
                {errors.videoFile.message}
              </p>
            )}
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="bg-[rgba(40,0,65,0.45)] border border-white/10 rounded-xl p-3 text-sm">
              <p className="font-semibold text-purple-300">
                Selected File
              </p>
              <p>{selectedFile.name}</p>
              <p className="text-gray-400">
                Size: {formatFileSize(selectedFile.size)}
              </p>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={uploadProgress}
                max="100"
              />
            </div>
          )}

          {/* Error */}
          {errors.root && (
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
              {errors.root.message}
            </div>
          )}

          {/* Success */}
          {uploadedVideo && (
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-sm">
              <p className="font-semibold text-green-400">
                Upload Successful
              </p>
              <p className="text-gray-300">
                Duration: {formatDuration(uploadedVideo.duration)}
              </p>
              <p className="text-gray-400 text-xs">
                Uploaded at{" "}
                {new Date(uploadedVideo.uploadedAt).toLocaleString()}
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={uploading}
              className={`btn bg-purple-600/80 hover:bg-purple-600 border-none text-white ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUpload;
