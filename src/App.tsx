import { useState, useCallback } from 'react'
// import Component from "./DynamicGrouping/index";
import '@enterprise-ui/canvas-ui-css'

import EnterpriseIcon, {
  MailIcon,
  SearchIcon,
  PersonIcon,
  GearIcon,
  MenuIcon,
  DivisionToysIcon,
  DivisionKitchenIcon,
  NewIcon,
  ExportIcon,
  ImportIcon,
} from '@enterprise-ui/icons'
import {
  Anchor,
  Badge,
  Button,
  Dropdown,
  Divider,
  Grid,
  Heading,
  Image,
  Layout,
  TargetLogo,
  SideNav,
} from '@enterprise-ui/canvas-ui-react'
import SideMenu from './SideMenu'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow'
import ReactFlowComponent from './DynamicGrouping/index'
import { Modal } from '@enterprise-ui/canvas-ui-react'
const initialNodes = [
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: 'horizontal-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
  {
    id: 'horizontal-3',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Node 3' },
    position: { x: 250, y: 160 },
  },
  {
    id: 'horizontal-4',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Node 4' },
    position: { x: 500, y: 0 },
  },
  {
    id: 'horizontal-5',
    sourcePosition: 'top',
    targetPosition: 'bottom',
    data: { label: 'Node 5' },
    position: { x: 500, y: 100 },
  },
  {
    id: 'horizontal-6',
    sourcePosition: 'bottom',
    targetPosition: 'top',
    data: { label: 'Node 6' },
    position: { x: 500, y: 230 },
  },
  {
    id: 'horizontal-7',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Node 7' },
    position: { x: 750, y: 50 },
  },
  {
    id: 'horizontal-8',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Node 8' },
    position: { x: 750, y: 300 },
  },
  {
    id: 'horizontal-9',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Node 9' },
    position: { x: 950, y: 300 },
  },
]

const initialEdges = [
  {
    id: 'horizontal-e1-2',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-2',
    animated: true,
  },
  {
    id: 'horizontal-e1-3',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-3',
    animated: true,
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-2',
    type: 'smoothstep',
    target: 'horizontal-4',
    label: 'edge label',
  },
  {
    id: 'horizontal-e3-5',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-5',
    animated: true,
  },
  {
    id: 'horizontal-e3-6',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-6',
    animated: true,
  },
  {
    id: 'horizontal-e5-7',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-7',
    animated: true,
  },
  {
    id: 'horizontal-e6-8',
    source: 'horizontal-6',
    type: 'smoothstep',
    target: 'horizontal-8',
    animated: true,
  },
]

const App = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [openModal, setModal] = useState(false)
  const [jsonData, setJsonData] = useState<any>(null)
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e?.target?.result
          const parsedJson = JSON.parse(content as any)
          setJsonData(parsedJson)
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }

      reader.readAsText(file)
    }
  }

  return (
    <>
      <div>
        <div>
          <SideNav
            canMinimize
            hasOverlay={false}
            isVisible={isSideNavOpen}
            suppressAutoOpen={!isSideNavOpen}
            onRequestClose={() => {
              setIsSideNavOpen(!isSideNavOpen)
            }}
          >
            <SideNav.SkipLink href="#mainContent">
              Skip to Main Content
            </SideNav.SkipLink>
            <SideNav.SkipLink href="#sidebarContent">
              Skip to Side Bar
            </SideNav.SkipLink>
            <SideNav.Header as="button" role="button">
              <Heading size={4}>Menu</Heading>
            </SideNav.Header>
            <SideNav.Navigation>
              <SideNav.NavigationItem>
                <div
                  onClick={() => {
                    const temp = [...nodes]
                    temp.push({
                      id: `horizontal-${nodes.length + 1}`,
                      sourcePosition: 'right' as any,
                      targetPosition: 'left' as any,
                      data: { label: `Node ${nodes.length + 1}` },
                      position: {
                        x: nodes[nodes.length - 1].position.x + 100,
                        y: nodes[nodes.length - 1].position.y + 100,
                      },
                    })
                    setNodes(temp)
                    console.log(temp)
                  }}
                >
                  Add Node
                </div>

                <EnterpriseIcon icon={NewIcon} />
              </SideNav.NavigationItem>
              <SideNav.NavigationItem>
                <div
                  onClick={() => {
                    let tempjson = {
                      name: 'Metrics_Local',
                      description: 'Data Pipeline Application',
                      artifact: {
                        name: 'cdap-data-pipeline',
                        version: '6.7.1-SNAPSHOT',
                        scope: 'SYSTEM',
                      },
                      config: {
                        resources: {
                          memoryMB: 2048,
                          virtualCores: 1,
                        },
                        driverResources: {
                          memoryMB: 2048,
                          virtualCores: 1,
                        },
                        connections: edges.map((value, index) => {
                          return {
                            from: value.source,
                            to: value.target,
                          }
                        }),
                        comments: [],
                        postActions: [],
                        properties: {},
                        processTimingEnabled: true,
                        stageLoggingEnabled: false,
                        stages: nodes.map((value: any, index) => {
                          return {
                            name: value.data.label,
                            plugin: value?.plugin ?? {},
                            properties: value?.properties ?? {},
                            outputSchema: value?.outputSchema ?? {},
                          }
                        }),
                        schedule: '0 1 */1 * *',
                        engine: 'spark',
                        numOfRecordsPreview: 100,
                        description: 'Data Pipeline Application',
                        maxConcurrentRuns: 1,
                      },
                    }
                    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                      JSON.stringify(tempjson),
                    )}`
                    const link = document.createElement('a')
                    link.href = jsonString
                    link.download = 'data.json'

                    link.click()
                  }}
                >
                  Export
                </div>
                <EnterpriseIcon icon={ExportIcon} />
              </SideNav.NavigationItem>
              <SideNav.NavigationItem>
                <div
                  onClick={() => {
                    setModal(true)
                  }}
                >
                  Import
                </div>
                <EnterpriseIcon icon={ImportIcon} />
              </SideNav.NavigationItem>
            </SideNav.Navigation>
            <SideNav.Footer>
              <div className="hc-pa-normal">Footer can take any content</div>
            </SideNav.Footer>
          </SideNav>
        </div>
        <Layout fullWidth>
          <Layout.Header>
            <Grid.Container spacing="none" align="center">
              <Grid.Item className="hc-pr-expanded">
                <Grid.Container spacing="dense" align="center">
                  <Grid.Item>
                    <Heading className="hc-mr-expanded hc-clr-white hc-ta-center">
                      <div
                        onClick={() => {
                          setIsSideNavOpen(!isSideNavOpen)
                        }}
                      >
                        Demo App
                      </div>
                    </Heading>
                  </Grid.Item>
                </Grid.Container>
              </Grid.Item>
              <Grid.Item xs>
                <Grid.Container>
                  <Grid.Item className="hc-mt-min">
                    <Anchor className="hc-clr-white">Link 1</Anchor>
                  </Grid.Item>
                  <Grid.Item className="hc-mt-min">
                    <Anchor className="hc-clr-white">Link 2</Anchor>
                  </Grid.Item>
                  <Grid.Item className="hc-mt-min">
                    <Anchor className="hc-clr-white">Link 3</Anchor>
                  </Grid.Item>
                </Grid.Container>
              </Grid.Item>
            </Grid.Container>
          </Layout.Header>
          <Layout.GlobalActions>
            <Grid.Container spacing="dense" justify="flex-end">
              <Grid.Item>
                <Button iconOnly aria-label="Search Icon">
                  <EnterpriseIcon icon={SearchIcon} />
                </Button>
              </Grid.Item>
              <Grid.Item>
                <Badge
                  location="top-right"
                  content="3"
                  color="primary"
                  aria-label="3 unread notifications"
                >
                  <Button iconOnly aria-label="Mail Icon">
                    <EnterpriseIcon icon={MailIcon} />
                  </Button>
                </Badge>
              </Grid.Item>
              <Grid.Item>
                <Button iconOnly aria-label="Gear Icon">
                  <EnterpriseIcon icon={GearIcon} />
                </Button>
              </Grid.Item>
              <Grid.Item>
                <Dropdown location="bottom-left" width="sm">
                  <Button
                    iconOnly
                    className="hc-bg-grey07 hc-clr-black hc-ml-normal"
                    aria-label="Person Icon"
                  >
                    <EnterpriseIcon icon={PersonIcon} />
                  </Button>
                  <Dropdown.Menu>
                    <Dropdown.MenuItem>Logout</Dropdown.MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Item>
            </Grid.Container>
          </Layout.GlobalActions>
        </Layout>
      </div>
      <div>
        <Modal
          isVisible={openModal}
          headingText="Import Pipeline"
          onRefuse={() => {
            setModal(false)
          }}
        >
          <div className="hc-pa-normal">
            <Grid.Container>
              <Grid.Item xs>
                <input type="file" onChange={handleFileChange} accept=".json" />
              </Grid.Item>
            </Grid.Container>
            <Grid.Container direction="row-reverse" spacing="dense">
              <Grid.Item>
                <Button
                  onClick={() => {
                    let x = 100
                    let y = 0
                    console.log(jsonData.stages, jsonData.connections, jsonData)
                    let nodes = jsonData?.config?.stages?.map(
                      (value: any, index: number) => {
                        return {
                          id: `horizontal-${value.name}`,
                          sourcePosition: 'right',
                          targetPosition: 'left',
                          plugin: value.plugin,
                          properties: value.properties,
                          outputSchema: value.outputSchema,
                          data: { label: value.name },
                          position: { x: (x += 500), y: y },
                        }
                      },
                    )
                    let edges = jsonData?.config?.connections?.map(
                      (value: any, index: number) => {
                        return {
                          id: `horizontal-e1-${index}`,
                          source: `horizontal-${value.from}`,
                          target: `horizontal-${value.to}`,
                          animated: true,
                        }
                      },
                    )
                    setNodes(nodes)
                    setEdges(edges)
                    setModal(false)
                  }}
                  type="primary"
                >
                  Import
                </Button>
              </Grid.Item>
              <Grid.Item>
                <Button
                  onClick={() => {
                    setModal(false)
                  }}
                  type="secondary"
                >
                  Cancel
                </Button>
              </Grid.Item>
            </Grid.Container>
          </div>
        </Modal>
      </div>
      <div>
        <div style={{ height: '100vh', width: '100vw' }}>
          <ReactFlowComponent
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setEdges={setEdges}
          ></ReactFlowComponent>
        </div>
      </div>
      .
    </>
  )
}
export default App
