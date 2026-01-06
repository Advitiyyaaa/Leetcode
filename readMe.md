- npm init -y
- npm i express dotenv cookie-parser validator bcrypt jsonwebtoken redis
- npm i mongoose (helps in easily designing custom Schema)
- once schema is created we have to create its model:
    const User = mongoose.model("user",userSchema) -> {"user" is collection name in database, userSchema is our custom schema}
    module.exports = User
- terminal code to generate Secret_code for jwtTokens:
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
- Compund indexing:
    submissionSchema.index({userId:1 , problemId:1})
    "here '1' tells that ids will be arranged in ascending order('-1' will be for descending order)"
- pre/post function on schema
    userSchema.post('findOneAndDelete',async function(userInfo){
        if(userInfo){
            await mongoose.model('submission').deleteMany({userId: userInfo._id})
        }
    })
- ref in schema defines which model is linked.
- populate() is used while querying to pull in that linked document automatically.
    const submissions = await Submission.find().populate('userId', 'name email -_id');

#                                                                    {FRONTEND}
- HOOKS REVISED
    - if changes are made in a component and we have to re-render that component instead of re-rendering the whole page we use "USE-EFFECT-HOOK"
        lame-language-example
            before:                           
            function son(){             
                console.log("Son")
            }
            function sum(){
                a=10
                b=10
                console.log(a+b)
            }
            son()
            sum()

            after: (here changes are only made in sum function so only sum function should be re-rendered)
            function son(){             
                console.log("Son")
            }
            function sum(){
                a=10
                b
                console.log(a+b)
            }
            son()
            sum()

    - here changes are made in sum function and sum function also calls son() but there is no change in son() so no need to re-render it, for this we use "REACT.MEMO" or "USE-MEMO-HOOK"
        before:                           
            function son(){             
                console.log("Son")
            }
            function sum(){
                a=10
                b=10
                console.log(a+b)
                son()
            }
            sum()

        after:
            function son(){             
                console.log("Son")
            }
            function sum(){
                a=10
                b=13
                console.log(a+b)
                son()
            }
            sum()

    - "USE-CALLBACK-HOOK" is used when we pass a function as a prop to a child component,
      and we don’t want that function to get recreated again and again unless its dependency changes.

        lame-language-example
            before:
                function Parent(){
                    const handleClick = ()=> console.log("Clicked!")

                    // passing function to child
                    Child(handleClick)
                }

                function Child(fn){
                    console.log("Child rendered")
                    fn()
                }

                Parent()  // every time Parent runs, handleClick is re-created

            after (using useCallback):
                function Parent(){
                    const handleClick = useCallback(()=> console.log("Clicked!"), [])
                    Child(handleClick)
                }

                function Child(fn){
                    console.log("Child rendered")
                    fn()
                }

                Parent()

        👉 meaning: if parent re-renders but the logic of `handleClick` didn’t change,
        React will **reuse the same function** instead of creating a new one every time.
        This helps avoid **unnecessary re-renders** in child components that depend on that function.

    - "USE-REF-HOOK" is used to directly access or store a value between renders **without causing re-renders**.

        lame-language-example
            before:
                let count = 0
                function increase(){
                    count++
                    console.log("Count:", count)
                }
                increase()
                increase()   // works, but not reactive inside React re-renders

            after (in React):
                const countRef = useRef(0)

                function increase(){
                    countRef.current++
                    console.log("Count:", countRef.current)
                }

                // countRef.current value changes, but component doesn’t re-render unnecessarily

        👉 meaning: `useRef` is like a hidden pocket where you can keep data that stays
        the same between re-renders — perfect for:
        - storing previous values
        - accessing DOM elements
        - holding timeouts, intervals, etc.

- Using react-hook-form for creating signup form
- Using hookform resolver and zod for validation
- We are using axios instead of fetch (axios is better than fetch, it converts to json automatically)
- 3 && 10 dosen't return true it will return 10 (if 3 is true then returns 10)
- !(object-filled)=false, !(null)=true


# npm i cloudinary