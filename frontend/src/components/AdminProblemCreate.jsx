import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';

// Zod schema matching the backend problem schema exactly
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.enum(['Array', 'LinkedList', 'String', 'Graph', 'DP'])).min(1, 'At least one tag required'),
  visibleCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  starterCode: z.array(
    z.object({
      language: z.enum(['cpp', 'java', 'javascript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).min(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['cpp', 'java', 'javascript']),
      completedCode: z.string().min(1, 'Complete code is required')
    })
  ).min(3, 'All three languages required')
});

export default function AdminProblemCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      tags: [],
      starterCode: [
        { language: 'cpp', initialCode: '' },
        { language: 'java', initialCode: '' },
        { language: 'javascript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'cpp', completedCode: '' },
        { language: 'java', completedCode: '' },
        { language: 'javascript', completedCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenCases'
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting data:', data); // Debug log
      const response = await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Full error:', error); // Debug log
      alert(`Error: ${error.response?.data || error.message}`);
    } finally {
    setIsSubmitting(false); // 🔓 Re-enable button
    }
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto py-6 text-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-white">
        Create New Problem
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* CARD WRAPPER COMPONENT LOOK */}
        <div className="bg-[rgba(40,0,65,0.35)] border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_10px_rgba(157,0,255,0.25)] p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">Basic Information</h2>

            <div className="space-y-4">

            <div>
                <label className="text-sm">Title</label>
                <input
                {...register('title')}
                className={`input bg-black/60 border border-white/20 w-full rounded-xl mt-1 p-2 ${errors.title && 'border-red-500'}`}
                placeholder="Enter problem title"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="text-sm">Description</label>
                <textarea
                {...register('description')}
                className={`textarea bg-black/60 border border-white/20 w-full rounded-xl h-32 mt-1 p-2 ${errors.description && 'border-red-500'}`}
                placeholder="Describe problem here..."
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4 flex-wrap">
                <div className="w-full md:w-1/2">
                <label className="text-sm">Difficulty</label>
                <select
                    {...register('difficulty')}
                    className="select bg-black/80 border-white/20 w-full rounded-xl mt-1 p-2"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                {errors.difficulty && <p className="text-red-400 text-sm mt-1">{errors.difficulty.message}</p>}
                </div>

                <div className="w-full md:w-1/2">
                <label className="text-sm">Tags (Select multiple)</label>
                <select
                    {...register('tags')}
                    multiple
                    className="select bg-black/80 border-white/20 w-full rounded-xl mt-1 p-2 h-24"
                >
                    <option value="Array">Array</option>
                    <option value="LinkedList">Linked List</option>
                    <option value="String">String</option>
                    <option value="Graph">Graph</option>
                    <option value="DP">DP</option>
                </select>
                {errors.tags && <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>}
                <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
            </div>
            </div>
        </div>

        {/* Visible Test Cases */}
        <div className="bg-[rgba(40,0,65,0.35)] border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_10px_rgba(157,0,255,0.25)] p-6">
            <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-purple-300">Visible Test Cases</h2>
            <button type="button" onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="px-3 py-1 bg-purple-700/50 hover:bg-purple-700 text-white rounded-lg"
            >
                + Add
            </button>
            </div>

            {visibleFields.map((field, index) => (
            <div key={field.id} className="border border-white/10 p-4 rounded-xl bg-black/40 space-y-2 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-purple-300">Test Case #{index + 1}</h3>
                  <button type="button" onClick={() => removeVisible(index)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
                </div>
                <input {...register(`visibleCases.${index}.input`)} placeholder="Input (e.g., '2 3')" className="input bg-black/60 border-white/20 w-full rounded-lg p-2"/>
                {errors.visibleCases?.[index]?.input && <p className="text-red-400 text-xs">{errors.visibleCases[index].input.message}</p>}
                
                <input {...register(`visibleCases.${index}.output`)} placeholder="Output (e.g., '5')" className="input bg-black/60 border-white/20 w-full rounded-lg p-2"/>
                {errors.visibleCases?.[index]?.output && <p className="text-red-400 text-xs">{errors.visibleCases[index].output.message}</p>}
                
                <textarea {...register(`visibleCases.${index}.explanation`)} placeholder="Explanation" className="textarea bg-black/60 border-white/20 w-full rounded-lg p-2" rows={2}/>
                {errors.visibleCases?.[index]?.explanation && <p className="text-red-400 text-xs">{errors.visibleCases[index].explanation.message}</p>}
            </div>
            ))}
            {errors.visibleCases && <p className="text-red-400 text-sm">{errors.visibleCases.message}</p>}
        </div>

        {/* Hidden Test Cases */}
        <div className="bg-[rgba(40,0,65,0.35)] border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_10px_rgba(157,0,255,0.25)] p-6">
            <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-purple-300">Hidden Test Cases</h2>
            <button type="button" onClick={() => appendHidden({ input: '', output: '' })}
                className="px-3 py-1 bg-purple-700/50 hover:bg-purple-700 text-white rounded-lg"
            >
                + Add
            </button>
            </div>

            {hiddenFields.map((field, index) => (
            <div key={field.id} className="border border-white/10 p-4 rounded-xl bg-black/40 space-y-2 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-purple-300">Hidden Test #{index + 1}</h3>
                  <button type="button" onClick={() => removeHidden(index)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
                </div>
                <input {...register(`hiddenCases.${index}.input`)} placeholder="Input" className="input bg-black/60 border-white/20 w-full rounded-lg p-2"/>
                {errors.hiddenCases?.[index]?.input && <p className="text-red-400 text-xs">{errors.hiddenCases[index].input.message}</p>}
                
                <input {...register(`hiddenCases.${index}.output`)} placeholder="Output" className="input bg-black/60 border-white/20 w-full rounded-lg p-2"/>
                {errors.hiddenCases?.[index]?.output && <p className="text-red-400 text-xs">{errors.hiddenCases[index].output.message}</p>}
            </div>
            ))}
            {errors.hiddenCases && <p className="text-red-400 text-sm">{errors.hiddenCases.message}</p>}
        </div>

        {/* Code Editor */}
        <div className="bg-[rgba(40,0,65,0.35)] border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_10px_rgba(157,0,255,0.25)] p-6">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Code Templates</h2>

            {[0, 1, 2].map((idx) => (
            <div key={idx} className="mb-6 space-y-2">
                <h3 className="text-lg text-purple-200">
                {idx === 0 ? "C++" : idx === 1 ? "Java" : "JavaScript"}
                </h3>
                <p className="text-sm text-gray-400">Starter Code (what users see initially)</p>
                <textarea {...register(`starterCode.${idx}.initialCode`)} rows={8}
                className="w-full bg-black/70 border border-purple-500/30 rounded-xl p-3 font-mono text-sm" 
                placeholder="Enter starter code with stdin/stdout handling..."/>
                {errors.starterCode?.[idx]?.initialCode && <p className="text-red-400 text-xs">{errors.starterCode[idx].initialCode.message}</p>}
                
                <p className="text-sm text-gray-400">Reference Solution (correct implementation)</p>
                <textarea {...register(`referenceSolution.${idx}.completedCode`)} rows={8}
                className="w-full bg-black/70 border border-purple-500/30 rounded-xl p-3 font-mono text-sm"
                placeholder="Enter complete working solution..."/>
                {errors.referenceSolution?.[idx]?.completedCode && <p className="text-red-400 text-xs">{errors.referenceSolution[idx].completedCode.message}</p>}
            </div>
            ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 
                      bg-purple-600/70 hover:bg-purple-600 text-white font-semibold 
                      shadow-[0_0_8px_rgba(157,0,255,0.6)] transition 
                      ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </>
          ) : (
            "Create Problem"
          )}
        </button>
        </form>
    </div>
  );
}