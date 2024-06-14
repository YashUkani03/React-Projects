import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [Password, setPassword] = useState('')
  const [Length, setLength] = useState(8)
  const [NumberAllowed, setnumberAllowed] = useState(false)
  const [CharacterAllowed, setCharacterAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz'
    if (NumberAllowed) str += '1234567890'
    if (CharacterAllowed) str += '!@#$%^&*_+}{?><'

    for (let i = 0; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      setPassword(pass)
    }
  }, [Length, NumberAllowed, CharacterAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [Length, NumberAllowed, CharacterAllowed ,passwordGenerator])

const passwordRef = useRef(null)

const CopytoClipboard = useCallback( ()=>{
  window.navigator.clipboard.writeText(Password)
},[Password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={CopytoClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ">
            Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              value={Length}
              onChange={(e) => { setLength(e.target.value) }}
              className="cursor-pointer"
            />
            <label>Length:{Length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              defaultChecked={NumberAllowed}
              id="numberChecked"
              onChange={(e) => {
                setnumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberChecked">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              defaultChecked={CharacterAllowed}
              id="CharacterChecked"
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="CharacterChecked">Character</label>
          </div>

        </div>
      </div>
    </>
  )
}
export default App;
