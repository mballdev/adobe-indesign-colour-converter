import React, { useEffect, useRef, PropsWithChildren } from "react";

// default Adobe component for event listening - minor typing but any and ignore errors here to avoid changing the component
export const WC: React.FC<PropsWithChildren> = (props) => {
    const elRef = useRef(null);

    const handleEvent = (evt: any) => {
        const propName = `on${evt.type[0].toUpperCase()}${evt.type.substr(1)}`;
        // @ts-expect-error
        if (props[propName]) {
            // @ts-expect-error
            props[propName].call(evt.target, evt);
        }
    }

    useEffect(() => {
        const el = elRef.current;
        const eventProps = Object.entries(props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.addEventListener(k.substr(2).toLowerCase(), handleEvent));

        return () => {
            const el = elRef.current;
            const eventProps = Object.entries(props).filter(([k,v]) => k.startsWith("on"));
            eventProps.forEach(([k,v]) => el.removeEventListener(k.substr(2).toLowerCase(), handleEvent));
        }
    }, []);

    return <div ref={elRef} {...props}>{props.children}</div>
}