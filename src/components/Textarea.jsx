

export default function Textarea(props) {
    return (
        <textarea
            className="w-2/3 h-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe la descripción aquí..."
            {...props}
        />
    )
}