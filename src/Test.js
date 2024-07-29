function GetName(props) {
    return <h1>Hello, {props.name}</h1>;
}

GetName.defaultProps = {
    name:'임시이름'
}

export default GetName;