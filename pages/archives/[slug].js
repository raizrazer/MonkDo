import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function ArchivesTodoItem() {
  const router = useRouter()
  const { slug } = router.query
  const iconSize = 20;
  return(
    <Layout>
        <div class="todoCheckListMain">
            <div class="todoMainEnter">
              <div class="todoMainEnter_Top">
                <div class="title">
                  <p>Archived: {parseInt(slug)+1}</p>
                </div>
                <div class="rightside">
                  <div class="buttons">
                    <Image width={iconSize} height={iconSize} src="/svg/archive.svg" alt="archive" />
                    <Image width={iconSize} height={iconSize} src="/svg/delete-alt.svg" alt="delete" />
                  </div>
                  <div class="percentage">
                    <p>5%</p>
                  </div>
                </div>
              </div>
              <div class="todoMainEnter_Bottom">
                <div class="taskInput">
                  <input
                    type="text"
                    name="createtodo"
                    id="createTask"
                    placeholder="Type the task..."
                  />
                  <Image width={iconSize} height={iconSize} src="/svg/ui-add.svg" alt="add" />
                </div>
  
                <div class="taskItem" draggable="true">
                  <div class="leftside">
                    <div class="dragger">
                      <Image width={iconSize} height={iconSize} src="/svg/dragger.svg" alt="dragme" />
                    </div>
                    <div class="task-content">
                      <p>Code the developer</p>
                    </div>
                  </div>
                  <div class="rightside">
                    <div class="buttons">
                      <Image width={iconSize} height={iconSize} src="/svg/edit.svg" alt="edit" />
                      <Image width={iconSize} height={iconSize} src="/svg/delete-alt.svg" alt="remove" />
                    </div>
                    <div class="time"><p>11:53 PM</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  )
}