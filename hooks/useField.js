import {useState} from "react";

export default function useField(initialValue) {
  const [state, setState] = useState(() => initialValue)

  function handleChange(event) {
    setState(previous => ({
        ...previous, [event.target.name]: event.target.value
      })
    )
  }

  return [state, handleChange]
}
