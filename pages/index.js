import { useState, useEffect } from 'react'

export async function getStaticProps() {
    return {
        props: {
            components: ['ComponentA', 'ComponentB'],
        },
    }
}

const Home = ({ components }) => {
    const [customComponents, setCustomComponents] = useState(null)

    useEffect(async () => {
        let newCustomComponents = {}
        for (let name of components) {
            newCustomComponents[name] = (await import(`../components/${name}.jsx`))[name]
        }

        setCustomComponents(newCustomComponents)
    }, [])

    return (
        <main>
            <h1>Hello</h1>
            {customComponents
                ? Object.values(customComponents).map(Component => {
                      return <Component></Component>
                  })
                : null}
        </main>
    )
}

export default Home
