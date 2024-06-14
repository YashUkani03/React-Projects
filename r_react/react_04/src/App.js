import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [character, setcharacter] = useState(false)
  const [Password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz"
    if (numberAllowed) str += "0123456789"
    if (character) str += "!@#$%^&*_+}{?><"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, character])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, character, passwordGenerator])

  const passwordRef = useRef(null)

  const Copytoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)

  }, [Password])
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
            onClick={Copytoclipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ">
            Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => { setlength(e.target.value) }}
              className="cursor-pointer"

            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="CharacterAllowed"
              onChange={() => {
                setcharacter((prev) => !prev)
              }}
            />
            <label htmlFor="CharacterAllowed">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
