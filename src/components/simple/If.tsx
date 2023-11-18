interface IfProps {
    test: boolean;
    children: any
}

export default function If(props: IfProps) {
    if (props.test) {
        return props.children;
    } else {
        return null;
    }
}