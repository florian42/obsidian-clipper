import { yamlItem } from "../src/yaml"


describe('yamlItem', () => {
    it('returns valid yaml item', () => {
        expect(yamlItem("title", "test")).toBe('title: "test"\n')
    })
})