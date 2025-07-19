import { FC } from 'react'
import Modal from '../Modal'
import { GetAccountResponse } from '../../service/api/Account/Account'
import { closeModalHandler } from '../../service/utils/modalHandler'
import Badge from '../../theme/Badge'


interface IProps {
    data : GetAccountResponse | undefined
  }
const SeeDetailsAccount : FC<IProps> = (props) => {
  const {data} = props
  return (
    <Modal
    id={"SeeDetailsAccount"}
    title="جزئیات جساب"
    textPrimaryBtn='تایید'
    clickHandler={() => closeModalHandler('SeeDetailsAccount')}
  >
    <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
      <div className="flex items-center gap-x-8">
        <div className="flex flex-col gap-y-2 me-7">
          <span className="text-xs">نام کارشناس</span>
          <p className="text-sm">{`${data?.userFirstName}${data?.userLastName}`}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs">بانک</span>
          <p className="text-sm">{data?.bankName}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs">شماره کارت</span>
          <p className="text-sm">{data?.accountId}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-8">
        <div className="flex flex-col gap-y-2">
          <span className="text-xs">وضعیت پرداخت</span>
          {data?.isActive ? (
            <Badge
              status={true}
              className="w-[2.938rem] h-6 text-xs font-bold"
            >
              تایید شده
            </Badge>
          ) : (
            <Badge
              status={false}
              className="w-[2.938rem] h-6 text-xs font-bold"
            >
              رد شده
            </Badge>
          )}
        </div>
      </div>
    </div>
   </Modal>
  )
}

export default SeeDetailsAccount