import { useCallback, useState } from 'react'

export interface IUseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  id?: string
}

export function useDisclosure(props: IUseDisclosureProps = {}) {
  const { onClose: onCloseProp, onOpen: onOpenProp, isOpen: isOpenProp } = props

  const handleOpen = useCallback(() => onOpenProp?.(), [onOpenProp])
  const handleClose = useCallback(() => onCloseProp?.(), [onCloseProp])

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false)

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState

  const isControlled = isOpenProp !== undefined

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    handleClose?.()
  }, [isControlled, handleClose])

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    handleOpen?.()
  }, [isControlled, handleOpen])

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }, [isOpen, onOpen, onClose])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}
