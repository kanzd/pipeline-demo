import React, { useCallback, useEffect } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
} from 'reactflow'
import ELK from 'elkjs/lib/elk.bundled.js'
import Dagre from '@dagrejs/dagre'
import 'reactflow/dist/style.css'
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  g.setGraph({ rankdir: options.direction })

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target))
  nodes.forEach((node: any) => g.setNode(node.id, node))

  Dagre.layout(g)

  return {
    nodes: nodes.map((node: any) => {
      const { x, y } = g.node(node.id)

      return { ...node, position: { x, y } }
    }),
    edges,
  }
}
const HorizontalFlow = ({
  nodes,
  edges,
  setNodes,
  onNodesChange,
  onEdgesChange,
  setEdges,
}: any) => {
  const onConnect = useCallback(
    (params: any) => setEdges((els: any) => addEdge(params, els)),
    [],
  )
  const { fitView } = useReactFlow()
  const onLayout = useCallback(
    (direction: any) => {
      const layouted = getLayoutedElements(nodes, edges, { direction })

      setNodes([...layouted.nodes])
      setEdges([...layouted.edges])

      window.requestAnimationFrame(() => {
        fitView()
      })
    },
    [nodes, edges],
  )

  useEffect(() => {
    onLayout('LR')
  }, [edges])
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <MiniMap style={{ height: 120 }} zoomable pannable />
      <Controls />
    </ReactFlow>
  )
}
const HorizontalFlowComponent = (props: any) => {
  return (
    <ReactFlowProvider>
      <HorizontalFlow {...props}></HorizontalFlow>
    </ReactFlowProvider>
  )
}

export default HorizontalFlowComponent
