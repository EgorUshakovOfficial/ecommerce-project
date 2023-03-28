export default function NavWrapper({children}){
    return (
        <div style={{
            display:"flex",
            alignItems:"center",
            gap:"0.5em"
        }}>
            {children}
        </div>
    );
}