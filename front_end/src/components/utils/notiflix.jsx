import '../../css/bootstrap.css'
import Notiflix from 'notiflix'

      Notiflix.Confirm.init({
        className: 'notiflix-confirm',
        width: '30rem',
        zindex: 4003,
        position: 'top',
        distance: '0rem',
        backgroundColor: '#f2f2f2',
        borderRadius: '20px',
        backOverlay: true,
        backOverlayColor: 'rgba(0,0,0,0.5)',
        rtl: false,
        fontFamily: 'Urbanist',
        cssAnimation: true,
        cssAnimationDuration: 300,
        cssAnimationStyle: 'fade',
        plainText: true,
        titleColor: '#000000',
        titleFontSize: '1.5rem',
        titleMaxLength: 34,
        messageColor: '#000000',
        messageFontSize: '1.2rem',
        messageMaxLength: 110,
        buttonsFontSize: '1rem',
        buttonsMaxLength: 34,
        okButtonColor: '#4B82FB',
        okButtonBackground: '#222023',
        cancelButtonColor: '#000000',
        cancelButtonBackground: '#ffffff',
      })


