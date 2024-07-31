import React from 'react'
import SidebarMenu from '../../../components/SideBarMenu'

export default function HasilDeteksi() {
    return (
        <div>
            <div className='lg:flex'>
                <div>
                    <SidebarMenu />
                </div>
                <div className="flex-1 ml-80 p-6 overflow-auto bg-white rounded-lg">
                    <h1>HASIL DETEKSI PENYAKIT</h1>
                </div>
            </div>
        </div>
    )
}
