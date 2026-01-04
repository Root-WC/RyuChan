import { motion } from 'motion/react'
import { marked } from 'marked'
import { useEffect, useState } from 'react'
import type { PublishForm } from '../types'

type WritePreviewProps = {
	form: PublishForm
	coverPreviewUrl: string | null
	onClose: () => void
	slug?: string
}

export function WritePreview({ form, coverPreviewUrl, onClose, slug }: WritePreviewProps) {
    const [html, setHtml] = useState('')

    useEffect(() => {
        async function render() {
            const res = await marked.parse(form.md)
            setHtml(res)
        }
        render()
    }, [form.md])

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-auto">
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
                    <div className="text-gray-500 text-sm mb-4">
                        {form.date} · {form.tags.join(', ')}
                    </div>
                    {coverPreviewUrl && (
                        <img src={coverPreviewUrl} alt="Cover" className="w-full h-64 object-cover rounded-xl mb-6" />
                    )}
                    {form.summary && (
                        <div className="text-gray-600 italic mb-8">{form.summary}</div>
                    )}
                </div>
                
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
            </div>

			<motion.button
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='fixed top-4 right-6 rounded-xl border bg-white/90 px-6 py-2 text-sm shadow-lg'
				onClick={onClose}>
				关闭预览
			</motion.button>
		</div>
	)
}
