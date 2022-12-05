export default function FooterButtons({ onResetClick }) {
    return (
        <div className='btn-group'>
            <button className='btn btn__primary' onClick={onResetClick}>
                Reset
            </button>
            <button className='btn btn__primary' type='submit'>
                Send
            </button>
        </div>
    )
}
