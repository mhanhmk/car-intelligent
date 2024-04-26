import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns'

import './style.css'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Calendar } from '../../../components/ui/calendar'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { cn } from '../../../components/ui/utils'
import { useToast } from '../../../components/ui/use-toast'

export default function SaleCar() {
  const [field, setFiled] = React.useState(undefined)
  const { toast } = useToast()

  return (
    <>
      <div className="banner-container">
        <div className="sell-bg">
          <img src="/carsell/banner@2x.jpg" alt="" />
        </div>
        <div className="info-container">
          <div className="info-bottom">
            <ul>
              <li>
                <p className="pos-1 bottom-img" />
                <p>提交卖车信息</p>
              </li>
              <li>
                <img src="/carsell/line.png" alt="" />
              </li>
              <li>
                <p className="pos-2 bottom-img" />
                <p>权威估计</p>
              </li>
              <li>
                <img src="/carsell/line.png" alt="" />
              </li>
              <li>
                <p className="pos-3 bottom-img" />
                <p>同步拍卖爱车</p>
              </li>
              <li>
                <img src="/carsell/line.png" alt="" />
              </li>
              <li>
                <p className="pos-4 bottom-img" />
                <p>口碑经销商为你服务</p>
              </li>
            </ul>
          </div>
          <div className="banner-form">
            <div className="grid grid-flow-row grid-rows-6 grid-cols-2 gap-2">
              <div className="col-span-2">
                <Input placeholder="汽车车型"></Input>
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal', !field && 'text-muted-foreground')}
                    >
                      {field ? format(field, 'PPP') : <span>上牌时间</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field}
                      onSelect={setFiled}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Input placeholder="行驶公里数"></Input>
              </div>
              <div>
                <Input placeholder="城市"></Input>
              </div>
              <div>
                <Select value={undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择车况" />
                  </SelectTrigger>
                  <SelectContent className="SelectContent text-xs" position="popper">
                    <SelectItem value="A">无事故且外观无损伤</SelectItem>
                    <SelectItem value="B">无事故少量剐蹭钣金</SelectItem>
                    <SelectItem value="C">发生过碰撞事故</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="row-span-2 col-span-2">
                <Textarea placeholder="描述..."></Textarea>
              </div>
              <div className="col-span-2">
                <Button
                  onClick={() => {
                    toast({
                      title: '卖车提示',
                      description: '提交成功!!',
                    })
                  }}
                  className="w-full"
                >
                  提交
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="warpper-container">
        <div className="warpper-bg" />
        <div className="warpper-info">
          <ul>
            <li>
              <p className="title">
                <span className="spt-num3"> </span>
              </p>
              <p className="p-info">
                3万多家有收车需求的经
                <br />
                销商，为您匹配交易
              </p>
            </li>
            <li>
              <p className="title">
                <span className="spt-num2"> </span>
              </p>
              <p className="p-info">
                合作拍卖平台，2万买家 <br />
                竞争出价，谁高卖谁
              </p>
            </li>
            <li>
              <p className="title">权威大数据</p>
              <p className="p-info">
                权威大数据为您估
                <br />
                价，不让您少卖一分钱
              </p>
            </li>
            <li style={{ borderRight: 'none' }}>
              <p className="title">省时省心</p>
              <p className="p-info">
                一站式交易，方便快捷
                <br />
                省时省心
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="common-problem">
        <div className="common-bg" />
        <div className="problem-body">
          <div className="problem-title">
            <span>常见问题</span>
          </div>
          <ul>
            <li>
              <p className="faq-title">
                <span>Q1</span>
                在第一车网卖车有什么优势？
              </p>
              <p className="faq-text">
                权威数据为您估价，不让您少卖一分钱。3万多家有收车需求的经销商，为您匹配交易。合作拍卖平台，2万买家竞争出价，谁高卖谁一站式交易，省时省心
                !
              </p>
            </li>
            <li>
              <p className="faq-title">
                <span>Q2</span>
                卖车需要准备什么？
              </p>
              <p className="faq-text">
                1、身份证；2、环保标；3、购置税本；4、行驶证；5、检字标；6、购置税发票；7、车辆登记证；8、交强险标；9、购车发票/最近一次过户发票；10、交强险单。
              </p>
            </li>
            <li>
              <p className="faq-title">
                <span>Q3</span>
                卖车流程是怎样的？
              </p>
              <p className="faq-text">
                1、在本页填写卖车信息或拨打400-822-0321联系我们 ;<br />
                2、我们将为您估价 ;<br />
                3、与我们合作的车辆拍卖平台车置宝上为您高价拍卖 ;<br />
                4、深耕二手车行业十几年，我们的口碑商户将为您服务。
                <br />
              </p>
            </li>
            <li>
              <p className="faq-title">
                <span>Q4</span>
                大概多久能成交？
              </p>
              <p className="faq-text">大部分车辆在第一车网上架7天内就可成交。</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
