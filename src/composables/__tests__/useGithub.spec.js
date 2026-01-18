import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGithub } from '../useGithub'

global.fetch = vi.fn()

describe('useGithub', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches user data successfully', async () => {
        const mockSettings = { user: 'testuser' }
        const mockUser = { login: 'testuser', public_repos: 0 }

        // Mocking the sequence of calls: User, Orgs, PRs
        fetch
            .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUser) }) // User
            .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) }) // Orgs
            .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ items: [] }) }) // PRs

        const { user, loading, fetchGithubData } = useGithub()

        expect(loading.value).toBe(false)
        await fetchGithubData(mockSettings)

        expect(loading.value).toBe(false)
        expect(user.value).toEqual(mockUser)
        expect(fetch).toHaveBeenCalledTimes(3)
    })

    it('handles API errors', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
        const mockSettings = { user: 'testuser' }
        // Reject all calls to ensure Promise.all catches the error and no other call fails on undefined response
        fetch.mockRejectedValue(new Error('Network error'))

        const { error, loading, fetchGithubData } = useGithub()

        await fetchGithubData(mockSettings)

        expect(loading.value).toBe(false)
        expect(error.value).toBeTruthy()
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
    })
})
