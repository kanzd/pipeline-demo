import React, { useCallback, useEffect } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow'
import 'reactflow/dist/style.css'

const HorizontalFlow = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setEdges,
}: any) => {
  const onConnect = useCallback(
    (params: any) => setEdges((els: any) => addEdge(params, els)),
    [],
  )
  useEffect(() => {
    console.log(edges)
  }, [edges])
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="bottom-left"
    ></ReactFlow>
  )
}

export default HorizontalFlow
