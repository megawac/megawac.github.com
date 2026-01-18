import { ref } from 'vue'

export function useResume() {
    const resume = ref(null)
    const error = ref(null)
    const loading = ref(true)

    const fetchResume = async () => {
        try {
            const response = await fetch('/resume.json')
            if (!response.ok) throw new Error('Failed to fetch resume')
            const text = await response.text()
            // Basic JSON parsing, assuming valid JSON. 
            // The original code used a minifier, but we'll assume standard JSON for now or handle comments if needed.
            // If the original resume.json has comments, we might need a relaxed parser.
            // For now, let's try standard JSON.parse
            resume.value = JSON.parse(text)
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    return {
        resume,
        error,
        loading,
        fetchResume
    }
}
