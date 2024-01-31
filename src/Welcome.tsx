import '@enterprise-ui/canvas-ui-css'
import {
  Anchor,
  Caption,
  Card,
  Grid,
  Heading,
  Layout,
  TargetLogo,
} from '@enterprise-ui/canvas-ui-react'

import { Helmet } from 'react-helmet'
import Logo from './logo.svg'

const links: { href: string; title: string; children: string }[] = [
  {
    href: 'http://go/praxis-community',
    title: 'Join #praxis-community',
    children: 'Connect with other engineers using Praxis.',
  },
  {
    href: 'https://praxis.prod.target.com',
    title: 'Explore our documentation',
    children: 'Find in-depth information about Praxis.',
  },
  {
    href: 'https://praxis.prod.target.com/get-help/training-resources',
    title: 'Review Praxis technologies',
    children: 'Implement the core features of an enterprise UI.',
  },
  {
    href: 'https://praxis.prod.target.com/getting-started/styling',
    title: 'Style your content',
    children: 'Style your app using Target approved design systems.',
  },
]
const Welcome = () => {
  return (
    <Layout theme="default" fullWidth>
      <Helmet
        defaultTitle="pipeline-demo-new-prax-1"
        titleTemplate="%s - pipeline-demo-new-prax-1"
      />
      <Layout.Body includeRail>
        <Grid.Container justify="center">
          <Grid.Item lg={8} md={10} xl={8} sm={12} xs={12}>
            <Grid.Container
              className="hc-pt-none hc-pl-expanded"
              align="center"
              justify="center"
            >
              <Grid.Item>
                <Logo title="Praxis logo" />
              </Grid.Item>
              <Grid.Item>
                <Heading size={1}>Praxis</Heading>
                <p>Quickly develop and deploy a UI for your app.</p>
              </Grid.Item>
            </Grid.Container>
            <Grid.Container className="hc-pa-normal" justify="space-around">
              {links.map((link) => (
                <Grid.Item md={6} xs={12} key={`card_${link.title}`}>
                  <Anchor href={link.href} target="_blank" rel="noreferrer">
                    <Card className="hc-ph-3x hc-pv-expanded">
                      <Caption
                        below={
                          <span className="hc-fs-md">{link.children}</span>
                        }
                      >
                        <Heading size={3} className="hc-mb-normal">
                          {link.title}
                        </Heading>
                      </Caption>
                    </Card>
                  </Anchor>
                </Grid.Item>
              ))}
            </Grid.Container>
          </Grid.Item>
        </Grid.Container>
      </Layout.Body>
      <Layout.Footer>
        <Grid.Container justify="center">
          <Grid.Item>
            <TargetLogo size="inline" className="hc-mr-dense" />
            Built with{' '}
            <Anchor href="http://go/canvas" target="_blank" rel="noreferrer">
              Canvas UI
            </Anchor>{' '}
            and{' '}
            <Anchor href="http://go/praxis" target="_blank" rel="noreferrer">
              Praxis
            </Anchor>
            .
          </Grid.Item>
        </Grid.Container>
      </Layout.Footer>
    </Layout>
  )
}

export default Welcome
