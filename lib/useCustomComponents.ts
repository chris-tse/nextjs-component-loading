import { useState, useEffect, ComponentType } from 'react'

export default function useCustomComponents(componentNames: string[]): Record<string, ComponentType> {
    const [customComponents, setCustomComponents] = useState<Record<string, ComponentType>>(null)

    useEffect(() => {
        async function importCustomComponents() {
            let newCustomComponents = {}

            for (let name of componentNames) {
                newCustomComponents[name] = (await import(`../components/${name}`))[name]
            }

            setCustomComponents(newCustomComponents)
        }

        importCustomComponents()
    }, [])

    return customComponents
}
