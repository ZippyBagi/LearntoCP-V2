'use client';

import { SidebarContainer } from "@/app/scripts/sidebar/generateSidebarContainers";
import SidebarContainerNode from "./sidebar_container";

interface SidebarSectionProps{
    containers: SidebarContainer[];
}

export default function SidebarSection({containers} : SidebarSectionProps){

    return (

        <div className="w-full">

            {containers.map((container, i) => (

                <div key={container.name}>
                    {i > 0 && (<div className="border-t border-t-border-subtle" />)}
                
                    <SidebarContainerNode name={container.name} hrefs={container.hrefs} names={container.names}></SidebarContainerNode>
                
                </div>

            ))}
        </div>
    )
}