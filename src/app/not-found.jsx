import Image from 'next/image'
import Link from 'next/link'
import notFound from '/public/images/not-found.svg'
export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>

            <Image src={notFound} width={500} height={500} alt='page Not-found' className='' />

            <h1 className='text-5xl'>Not found – 404!</h1>
            <div>
                <Link href="/" className='text-2xl text-primary mt-5 btn btn-block '>Ir al Inicio</Link>
            </div>
        </div>
    )
}
