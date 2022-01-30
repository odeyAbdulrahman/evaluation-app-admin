import Swal from 'sweetalert2'
const utilitieSweetalert = () => {
  const msgSwl = (title, data, type) => Swal.fire(title, '' + data, type)
  const confirmSwl = (title, text, icon, confirmButtonText) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    })
  }
  return { msgSwl, confirmSwl }
}

export default utilitieSweetalert
