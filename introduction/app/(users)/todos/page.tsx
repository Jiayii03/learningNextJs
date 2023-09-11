import React from 'react'
import TodosList from './TodosList'
import { callApiFunc } from '../../api/callApiFunc'

function Todos() {
  const response = callApiFunc({ "userId" : 1, "title": "HELLO WORLD" })

  return (
    <div>
        <h1>This is where the Todos will be listed...</h1>
    </div>
  )
}

export default Todos