import { GetStaticProps } from 'next'
import { useState, useEffect, ComponentType } from 'react'


export const getStaticProps: GetStaticProps = async function() {
    return {
        props: {
            components: ['ComponentA', 'ComponentB'],
        },
    }
}

const Home = ({ components }) => {
    const [customComponents, setCustomComponents] = useState<Object>(null)

    useEffect(() => {
        async function importCustomComponents() {

            let newCustomComponents = {}
            for (let name of components) {
                newCustomComponents[name] = (await import(`../components/${name}`))[name]
            }

            setCustomComponents(newCustomComponents)
        }

        importCustomComponents()
    }, [])

    return (
        <main>
            <h1>Hello</h1>
            {customComponents
                ? Object.values(customComponents).map((Component: ComponentType) => {
                      return <Component></Component>
                  })
                : null}
        </main>
    )
}

export default Home
