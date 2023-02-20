export default function FooterButtons({ onResetClick }) {
    return (
        <div className='btn-group footer'>
            <button className='btn btn__primary' onClick={onResetClick}>
                Reset
            </button>
        </div>
    )
}
