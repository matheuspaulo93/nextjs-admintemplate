
type AuthInputProps = {
    label: string
    value: string
    required?: boolean
    rendered?: true | false
    type?: 'text' | 'email' | 'password'
    onChage?: (value: string) => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.rendered == undefined || props.rendered ? (
        <div className={`flex flex-col mt-4`}>
            <label>{props.label}</label>
            <input
                type={props.type ?? 'text'}
                value={props.value}
                onChange={e => props.onChage?.(e.target.value)}
                required={props.required}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 mt-2
                    border focus:border-blue-500 focus:outline-none focus:bg-gray-50
                `}/>
        </div>
    ) : null
}