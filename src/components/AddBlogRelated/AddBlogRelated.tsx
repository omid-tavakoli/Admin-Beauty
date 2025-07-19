import Modal from "../Modal";
import Table from "../Table";
import Pagination from "../Table/Pagination";
import { TableData } from "../Table/TableBody";
import { TableSection } from "../Table/TableSections";

export default function addBlogRelated() {
    const addBlogRelated = () => {}
    const tableSections: TableSection[] = [
        { title: "عکس" },
        { title: "عنوان" },
        { title: "دسته بندی" },
        { title: "نویسنده" },
        { title: "تاریخ انتشار" },
      ];
      const data : TableData = []
    return (
        <Modal
            id={"addBlogRelated"}
            title="افزودن مقاله‌های مرتبط"
            textPrimaryBtn="ثبت مقاله‌های مرتبط"
            clickHandler={addBlogRelated}>
                <div>
                <Table data={data} tableSections={tableSections}/>
                <Pagination/>
                </div>
        </Modal>
  )
}
