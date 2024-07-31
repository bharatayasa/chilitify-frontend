import React from 'react'
import SidebarMenu from '../../../components/SideBarMenu'

export default function DeskripsiData() {
    return (
        <div>
            <div className='flex'>
                <SidebarMenu />
                <div className="flex-1 ml-80 p-6 overflow-auto bg-white rounded-lg">
                    <h1>HALAMAN DESKRIPSI</h1>
                </div>
            </div>
        </div>
    )
}
