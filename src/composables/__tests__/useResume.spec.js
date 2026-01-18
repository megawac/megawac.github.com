import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useResume } from '../useResume'

global.fetch = vi.fn()

describe('useResume', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches and parses resume.json successfully', async () => {
        const mockResume = { name: 'Test User', skills: ['Vue', 'Testing'] }
        fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockResume))
        })

        const { resume, error, loading, fetchResume } = useResume()

        expect(loading.value).toBe(true)
        await fetchResume()

        expect(loading.value).toBe(false)
        expect(error.value).toBeNull()
        expect(resume.value).toEqual(mockResume)
        expect(fetch).toHaveBeenCalledWith('/resume.json')
    })

    it('handles fetch errors', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
        fetch.mockResolvedValueOnce({
            ok: false
        })

        const { resume, error, loading, fetchResume } = useResume()

        await fetchResume()

        expect(loading.value).toBe(false)
        expect(error.value).toBeTruthy()
        expect(resume.value).toBeNull()
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
    })

    it('handles parsing errors', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
        fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve('invalid json')
        })

        const { resume, error, loading, fetchResume } = useResume()

        await fetchResume()

        expect(loading.value).toBe(false)
        expect(error.value).toBeTruthy()
        expect(resume.value).toBeNull()
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
    })
})
