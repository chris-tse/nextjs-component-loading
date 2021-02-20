import { GetStaticProps } from 'next'
import { useState, useEffect, ComponentType } from 'react'
import useCustomComponents from '../lib/useCustomComponents'


export const getStaticProps: GetStaticProps = async function() {
    return {
        props: {
            components: ['ComponentA', 'ComponentB'],
        },
    }
}

export default function Home({ components }) {
    const customComponents = useCustomComponents(components)

    return (
        <main>
            <h1>Hello</h1>
            {customComponents
                ? Object.values(customComponents).map((Component) => {
                      return <Component></Component>
                  })
                : null}
        </main>
    )
}
