export const Loading = ({isMobile}) => {
    return (
        <div>
            <img alt="loading"
                 src="https://s2.loli.net/2022/02/02/hMjGdkIxHNnVRS9.png"
                 style={{position: "absolute",
                         width: isMobile ? "50%": "25%",
                         height: isMobile ? "10%" : "50%",
                         margin: "auto",
                         left: "0",
                         right: "0",
                         top: "0",
                         bottom: "0"}} />
        </div>
    )
}