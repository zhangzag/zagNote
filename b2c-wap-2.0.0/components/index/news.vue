<template>
  <!-- 健康资讯 -->
  <section class="information">
    <div class="information_img inline_block"></div>
    <div class="information_liist inline_block">
      <ul :style="{ top }">
        <li
          v-for="(al,index) in artLists"
          :class="index | artClassFilter"><a :href='"http://m.ak1ak1.com/news/detail"+al.healthAdvisoryID+".html"'>{{ al.networkTitle }}</a></li>
      </ul>
    </div>
    <div class="information_more inline_block">
      <!-- <a href="http://mnews.ak1ak1.com">更多</a> -->
      <a href="http://m.ak1ak1.com/news">更多</a>
    </div>
  </section>
  <!-- 健康资讯 end -->
</template>

<script>
  export default {
    data (){
      return {
        artLists: [{"author":"谭嘉仪","content":"<p>乙肝抗病毒的最终目的之一是降低HCC（肝细胞癌）的风险，这是每位乙肝患者最关心的问题。恩替卡韦作为抗乙肝病毒的一线药物，不少患者都在服用，但他们却不知道恩替卡韦为什么要空腹吃，具体有哪些用药禁忌，以至于使疗效大打折扣。</p><p><span><b>一、恩替卡韦为什么要空腹吃？</b></span></p><p>在过去的传统观念，很多人认为药是不能空腹吃，会对肠胃刺激，甚至引起呕吐而使药效打水漂。但其实对于恩替卡韦而言，答案在说明书上有明确强调，在说明书【药代动力学】一栏中写道：进食标准高脂餐或低脂餐的同时口服0.5mg本品会导致药物吸收的轻微延迟（从原来的0.75小时变为1.0～1.5小时），血药峰浓度（Cmax）降低44%～46%，药时曲线下面积（AUC）降低18%～20%。因此，本品应空腹服用（餐前或餐后至少2小时）。换言之，只有按要求空腹服药，才能让恩替卡韦的疗效达到最大化。</p><p data-bjh-caption-id=\"cap-31774505\" class=\"bjh-image-container\" data-bjh-helper-id=\"1538988597120\" style=\"text-align: center; \"><img src=\"http://img1.ak1ak1.com:90/a/2018/12/24/1545621414726.jpg\" alt=\"/1545621414726.jpg\"><br></p><p><span><b>二、服用恩替卡韦时有哪些禁忌事项？</b></span></p><p><span>1.</span><span>注意用药时间</span></p><p>恩替卡韦应当每天确定在同一时间空腹服用，吃药前2个小时和吃药后2个小时都应该禁食，一般推荐患者晚上服用。</p><p><span>2.&nbsp;</span><span>育龄女性注意避孕</span></p><p>建议育龄女性在用药期间注意避孕，如果有妊娠想法的患者，建议在医生指导下选择替诺福韦等其他药物，并做好肝功能检查。</p><p>当然，对于男性而言，恩替卡韦和替诺福韦对生育的安全性是没有太大的差别。和女性患者不一样，目前研究显示恩替卡韦不会影响精子的质量，也不会引起后代的畸形，患者可以在权衡利弊的情况下决定选择哪种药物。</p><p><span>3</span><span>定期复查肝肾功能</span></p><p>乙肝治疗是一个长期过程，定期检查肝肾功能有利于及时控制病情变化，若肝肾功能异常或治疗效果不佳，应及时做出治疗调整。</p><p><span>4.</span><span>清晰空腹的概念</span></p><p>有些患者认为只要不是和别的食物一起进食都是空腹。但他忽略了服药前后的进食也会是对药物吸收产生很大影响的，因此要记住，在用药前后的2个小时，需要禁食，保持空腹状态。</p><p><span>5.</span><span>做好自我管理</span></p><p>由于应酬或是一时忘记，很多患者都有出现漏服现象，当天能想起的话尽量补上；如第二天才想起，就只用当天用量即可，不能一天服用2倍的剂量，可能会增加副作用。恩替卡韦必须每天坚持，漏服次数太多会影响疗效，增加耐药率。因此患者要做好自我管理，按时用药。</p><p><span>6.</span><span>注意不良反应</span></p><p>服用恩替卡韦后可能会出现头痛、疲劳、眩晕、恶心等不适症状。这些症状大多数是暂时的，如果每次服药后都会有不适感，这时候最好的方法就是换另一种抗乙肝病毒的药物了。</p><p>总的来说，患者服用恩替卡韦，必须要遵循医嘱，注意以上6点禁忌事项，有任何新出现的症状及合并用药情况应及时告知医生。</p>","createTime":1545621514000,"ikey":"恩替卡韦片","isLink":"0","netWorkMark":"","networkTitle":"恩替卡韦为什么要空腹吃 有哪些用药禁忌事项","title":"恩替卡韦为什么要空腹吃 有哪些用药禁忌事项","url":"","source":"阿康大药房","parentTypeID":21,"healthAdvisoryID":"609","releaseTime":"2018-12-24 10:55:21.0","converUrl":"http://img3.ak1ak1.com:90/a/2018/12/25/1545731495646.jpg","picUrl":"http://img.ak1ak1.com:90/a/2018/12/24/1545630226178.jpg","picUrlLinks":"http://www.ak1ak1.com/products/2312.html","linkillness":"38","digest":"恩替卡韦分散片在乙肝抗病毒治疗过程中，是一个相对非常安全的药物，但前提是服用前做好以下要注意相关的禁忌事项。"},{"author":"谭嘉仪","content":"<div class=\"mth-editor-content\" data-coverimage=\"http://timg01.bdimg.com/timg?pacompress&amp;imgtype=0&amp;sec=1439619614&amp;autorotate=1&amp;di=53e60e5fa301ae0017e94dc082bd2ee2&amp;quality=100&amp;size=b746_10087&amp;cut_x=11&amp;cut_y=-10&amp;cut_w=746&amp;cut_h=500&amp;src=http%3A%2F%2Ftimg01.bdimg.com%2Ftimg%3Fpacompress%26imgtype%3D0%26sec%3D1439619614%26autorotate%3D1%26di%3Dd55b939eb90d2b0ff229eed3b3f27f34%26quality%3D100%26size%3Db870_10000%26src%3Dhttp%253A%252F%252Fpic.rmb.bdstatic.com%252F082b11f2092b60f973029f88a15a8a60.png%2540wm_2%252Ct_55m%252B5a625Y%252B3L%252BmYv%252BW6t%252Be9keS4iuiNr%252BW6lw%253D%253D%252Cfc_ffffff%252Cff_U2ltSGVp%252Csz_21%252Cx_14%252Cy_14\"><p>白蛋白，又叫清蛋白，是血液中含量最高的蛋白质。生活中不少人把它当做营养品，作为增强体质、预防疾病的“补品”。身子弱了，受伤了，甚至是感冒了都想用点白蛋白，那么，补充白蛋白究竟对身体有什么好处呢？</p><p><span><u><b>白蛋白的作用</b></u></span></p><p>白蛋白是血液制品的一种，因原料来自健康人体血液，因此也叫人血白蛋白，俗称“生命制品”，是构成血浆蛋白质的主要成分，主要有维持血浆胶体渗透压的生理功能，也具有载体的功能，是目前临床应用广泛的一种血液制品，直接静脉注射到患者体内。</p><p><span>白蛋白不是营养品，正常人使用有损健康！</span></p><p>人血白蛋白是临床常用的特殊急救药品，有它特殊的适应使用人群，并不是普通人群可以随意用来增强体质的“营养品”，乱用会有损伤健康的风险。</p><p data-bjh-caption-id=\"cap-68538696\" class=\"bjh-image-container\" data-bjh-helper-id=\"1538287149168\" style=\"text-align: center;\"><img src=\"http://img3.ak1ak1.com:90/a/2018/12/24/1545617314512.jpg\" alt=\"/1545617314512.jpg\"><br></p><p><span><u><b>人血白蛋白的适应症：</b></u></span></p><p>1. 大面积烧伤 24 h 后；</p><p>2. 急性创伤性休克；</p><p>3. 成人急性呼吸窘迫综合征；</p><p>4. 血液透析的辅助治疗；</p><p>5. 低蛋白血症的防治；</p><p>6. 肝硬化及肾病引起的水肿或腹水；</p><p>7. 急性肝功能衰竭伴肝昏迷；</p><p>8. 脑水肿及损伤引起的颅压升高；</p><p>9. 新生儿高胆红素血症等；</p><p>而对于血浆白蛋白＜25 g/L 的患者，也被视为可以使用白蛋白制剂的指征。</p><p>由于此类患者体内白蛋白，无法完成正常的血管内外液体交换，无法有效地承担药物载体的作用。此外，在某些急性大量失血（＞40% 血容量）的情况下，由于肝脏无法及时合成充足的白蛋白，也可考虑应用白蛋白制剂。</p><p>白蛋白是健康人血液中含量最多的蛋白质，健康人输入白蛋白后，是不能起到营养作用的，没有增强人的免疫力和抵抗力的作用，因为参与人体免疫机制形成的是球蛋白, 而不是白蛋白。另外，外源输注白蛋白后还会使自身白蛋白的合成受到抑制，导致分解加速，使用不恰当可造成循环负荷过重、血钠增高等不良后果，影响人体健康。</p><p>由此可见，补充白蛋白对需求患者有急救作用，帮助血液运输各种小分子化合物、维持渗透压作用。但对于健康人群补充白蛋白，非但对身体没有好处，反而增加身体负担，损害健康。</p><p><br></p><p><b>白蛋白有哪些品牌？</b></p><p><b><br></b></p><p></p><p style=\"text-align: center;\"></p><p style=\"text-align: center;\"><img src=\"http://img2.ak1ak1.com:90/a/2018/12/24/1545618837443.jpg\" alt=\"/1545618837443.jpg\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img src=\"http://img2.ak1ak1.com:90/a/2018/12/24/1545618848902.jpg\" alt=\"/1545618848902.jpg\">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;<img src=\"http://img3.ak1ak1.com:90/a/2018/12/24/1545618857048.jpg\" alt=\"/1545618857048.jpg\">&nbsp;&nbsp;</p><p style=\"text-align: center;\"><b><a target=\"_blank\" href=\"http://www.ak1ak1.com/products/1403.html\">【德国】贝林&nbsp; </a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a target=\"_blank\" href=\"http://www.ak1ak1.com/products/14500.html\">&nbsp;【奥地利】BAXTER&nbsp;</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a target=\"_blank\" href=\"http://www.ak1ak1.com/products/7532.html\">&nbsp; 奥克特珐玛&nbsp;</a></b></p><p></p><p></p><p style=\"text-align: center;\"></p><p style=\"text-align: center;\"><img src=\"http://img2.ak1ak1.com:90/a/2018/12/24/1545618864710.jpg\" alt=\"/1545618864710.jpg\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img src=\"http://img.ak1ak1.com:90/a/2018/12/24/1545618869860.jpg\" alt=\"/1545618869860.jpg\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img src=\"http://img.ak1ak1.com:90/a/2018/12/24/1545618874586.jpg\" alt=\"/1545618874586.jpg\"></p><p style=\"text-align: center;\"><b><a target=\"_blank\" href=\"http://www.ak1ak1.com/products/1402.html\">双林&nbsp; &nbsp; &nbsp; &nbsp; </a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a target=\"_blank\" href=\"http://www.ak1ak1.com/products/6456.html\"> &nbsp; &nbsp; 华兰&nbsp; </a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a target=\"_blank\" href=\"http://www.ak1ak1.com/products/1400.html\">&nbsp; 卫光</a></b></p><p></p><p><br></p><p><span>尽管白蛋白的品牌厂家有很多，但它们的适应症、治疗作用是相同的。同一个药物，药理作用是一样的，只是不同的厂家，因制作工艺、选材等不同导致效果可能存在差异，售价不同。</span></p></div><div id=\"boxShare\"></div><div id=\"author-con\"></div><div id=\"recent-con\"></div><div id=\"interest-con\"></div><div id=\"hotNews-con\"></div><div id=\"hotAuthor-con\"></div><div id=\"interpretationWrapper\" class=\"interpretation-wrapper\"><div class=\"backdrop\"></div><div class=\"interpretation-content\"><div class=\"interpretation\"></div></div></div>","createTime":1545619376000,"ikey":"人血白蛋白","isLink":"0","netWorkMark":"","networkTitle":"白蛋白是营养品吗 补充白蛋白对身体有什么好处","title":"白蛋白是营养品吗 补充白蛋白对身体有什么好处","url":"","source":"阿康大药房","parentTypeID":21,"healthAdvisoryID":"608","releaseTime":"2018-12-24 09:48:37.0","converUrl":"http://img.ak1ak1.com:90/a/2018/12/24/1545621664708.jpg","picUrl":"http://img3.ak1ak1.com:90/a/2018/12/24/1545616971889.jpg","picUrlLinks":"http://www.ak1ak1.com/products/1398.html","linkillness":"289","digest":"白蛋白又称“生命制品”，是构成血浆蛋白质的主要成分，主要有维持血浆胶体渗透压的生理功能，也具有载体的功能，是目前临床应用广泛的一种血液制品，直接静脉注射到患者体内。"},{"author":"谭嘉仪","content":"<p>恩替卡韦是乙肝抗病毒治疗的一线药物，因为其耐药性低、高抗病毒活性以及不良副作用少，是不少乙肝患者都首选药物。然而，再好的药物也有它的特殊所在，那么服用恩替卡韦分散片需要注意什么呢?阿康药大房怎么样?</p><p>恩替卡韦分散片在乙肝抗病毒治疗过程中，是一个相对非常安全的药物，但前提是服用前做需要注意以下事项：</p><p>1.遵循医嘱</p><p>患者应在医生的指导下服用恩替卡韦，并告知医生任何新出现的症状及合并用药情况。应告知患者如果停药有时会出现肝脏病情加重，所以应在医生的指导下改变治疗方法。</p><p>2.做好防护措施</p><p>使用恩替卡韦治疗并不能降低经性接触或污染血源传播HBV的危险性。因此，需要采取适当的防护措施。</p><p>3. 禁忌人群</p><p>对恩替卡韦或制剂中任何成份过敏者禁用。</p><p>4. 妊娠安全性低</p><p>对于有生育要求的女性应该在备孕前半年(至少3个月)换用替诺福韦酯或替比夫定这样妊娠安全性比较高的药物。</p><p>服用恩替卡韦后可能会出现头痛、疲劳、眩晕、恶心等不适症状。这些症状有些是暂时性的。过几天后逐渐减轻或不会再出现，有些会持续存在。每次服药后都会有不适感，这时候最好的方法就是换另一种抗乙肝病毒的药物了。</p><p>阿康大药房是有国家食药监局批准的合法正规网上药店，有需要的患者可以根据医生处方证明购买，另外，由于每个人的病情不同，具体用药需求也会有所差异，因此用药疑问应咨询主治医生或药师。</p><p>\n\n\n\n\n\n\n\n\n\n\n\n\n</p><p>通过上述介绍，相信大家对服用恩替卡韦分散片需要注意哪些事项都有了一定的了解，乙肝治疗是一场“持久战”，不仅要坚持抗病毒治疗，也要做好日常生活控制。</p>","createTime":1545212131000,"ikey":"服用恩替卡韦分散片","isLink":"0","netWorkMark":"","networkTitle":"服用恩替卡韦分散片需要注意什么 阿康药房怎么样","title":"服用恩替卡韦分散片需要注意什么 阿康药房怎么样","url":"","source":"阿康大药房","parentTypeID":21,"healthAdvisoryID":"576","releaseTime":"2018-12-19 17:36:48.0","converUrl":"","picUrl":"http://img1.ak1ak1.com:90/a/2018/12/19/1545212128622.jpg","picUrlLinks":"http://www.ak1ak1.com/products/2314.html","linkillness":"38","digest":"恩替卡韦是乙肝抗病毒治疗的一线药物，因为其耐药性低、高抗病毒活性以及不良副作用少，是不少乙肝患者都首选药物。然而，再好的药物也有它的特殊所在，那么服用恩替卡韦分散片需要注意什么呢?阿康药大房怎么样?"},{"author":"谭嘉仪","content":"<p>我们都知道，乙肝抗病毒治疗是一个漫长的过程，需要长期坚持用药，富马酸替诺福韦二吡呋酯片也就是我们常说的替诺福韦酯，是乙肝抗病毒常用药物，那么，富马酸替诺福韦二吡呋酯片需要终身吃吗?在阿康大药房能买到吗?</p><p>很多人对于乙肝都有一种恐惧，误以为是一种不治之症，但其实乙肝并不是什么绝症，配合治疗，坚持用药，大多数患者的病情是可以得到控制的。我们在治疗时一定要避免治疗误区，选择正确的方法。从众多治疗的患者中，数据显示通过检查只要患者符合治好特征，乙肝的有效率高达97%,因此乙肝患者不能放弃治疗。</p><p>富马酸替诺福韦二吡呋酯片长期服用是可以的，但至于是否需要终身吃，应视个人病情而定，不同患者的体质病情不同，对于药品的疗效吸收也会有所差异。</p><p>早期乙肝的患者使用替诺福韦酯能比较吻合病症，替诺福韦酯的治疗效果比较不错，在经济条件允许的情况下，患者可以长期的使用替诺福韦酯来治疗，控制病毒的复制。对孕妇来说，避免使用替诺福韦酯治疗。</p><p>富马酸替诺福韦二吡呋酯片本身的价格并不便宜，一盒就要好几百。而目前富马酸替诺福韦二吡呋酯片已纳入医保报销范围，这在很大程度上帮助患者减轻经济负担。</p><p>目前富马酸替诺福韦二吡呋酯片在阿康大药房是有出售的，阿康大药房是国家食药监局批准的正规网上药店，有需要的患者可以根据医生处方证明购买，由于每个人的病情以及体质不同，具体用药应咨询专业执业药师或主治医生，切勿擅自随意用药，以免引起不良反应的发生。</p><p>\n\n\n\n\n\n\n</p><p>以上是关于富马酸替诺福韦二吡呋酯片是否需要终身服用的相关内容介绍，如果您还想了解更多药品信息，可咨询阿康大药房在线药师，最后，希望大家正确的用药，早日的康复。</p>","createTime":1545210271000,"ikey":"富马酸替诺福韦二吡呋酯片","isLink":"0","netWorkMark":"","networkTitle":"富马酸替诺福韦二吡呋酯片需要终身吃吗 阿康药房能买吗","title":"富马酸替诺福韦二吡呋酯片需要终身吃吗 阿康药房能买吗","url":"","source":"阿康大药房","parentTypeID":21,"healthAdvisoryID":"570","releaseTime":"2018-12-19 17:05:22.0","converUrl":"","picUrl":"http://img1.ak1ak1.com:90/a/2018/12/19/1545210228867.jpg","picUrlLinks":"http://www.ak1ak1.com/products/2195.html","linkillness":"38","digest":"我们都知道，乙肝抗病毒治疗是一个漫长的过程，需要长期坚持用药，富马酸替诺福韦二吡呋酯片也就是我们常说的替诺福韦酯，是乙肝抗病毒常用药物，那么，富马酸替诺福韦二吡呋酯片需要终身吃吗?在阿康大药房能买到吗?"},{"author":"转载","content":"<p>12月8日，澎湃新闻(www.thepaper.cn)获悉，替诺福韦二代产品富马酸丙酚替诺福韦片(TAF)正式上市，这也是5年以来，我国获批的唯一一个乙肝新药。重庆医科大学第二附属医院院长任红在发布会上分析了富马酸丙酚替诺福韦片相比于之前乙肝治疗方案上的优越性，但同时他也对澎湃新闻表示，价格会成为影响该药的可及性关键因素。</p><p>8600万乙肝感染者，近80%未诊断</p><p>2018年《柳叶刀》子刊发布数据显示，中国目前乙肝表面抗原的阳性率是6.1%，按照这个比例推算我国目前有8600万乙肝病毒感染者。</p><p>“要知道全世界慢性乙型肝炎病毒感染者有2.57亿人，中国这8600万就占据了全球感染人数的三分之一。”中国工程院院士、北京大学医学部庄辉教授庄辉介绍，在乙肝病毒感染者中，又只有1608万的感染者进行了诊断，这个比例只占到了18.7%，治疗的比例也仅仅只有4.1%，也就是350万进行了治疗。</p><p>“同时在一项评估中国南部地区2001年-2010年的8080例肝硬化患者的横断面研究中发现，中国77.22%的肝硬化由乙肝病毒感染引起。我国有超过84%的肝癌与乙肝病毒感染相关。”庄辉院士呼吁，我国需要加强预防，扩大筛查，积极治疗才有可能实现世界卫生组织提出的在2030年消除乙肝的目标。</p><p>5年以来首个获批的乙肝新药</p><p>在今年11月富马酸丙酚替诺福韦片获批之前，我国已经有5个慢性乙肝抗病毒核苷类药物获批：拉米夫定、阿德福韦酯、替比夫定、恩替卡韦、富马酸替诺福韦酯(TDF)。前三个药物都因在耐药性方面存在缺陷，让许多患者在产生耐药后不得不寻找更合适的药物。其中TDF也是由吉利德研发并于2013年在我国获批上市。</p><p>目前在国内外临床上更广泛使用的药物为恩替卡韦和富马酸替诺福韦酯(TDF)，这两个药物在药效和耐药性方面都远胜于其他三个药物，因此不管在美国还是欧洲的肝病研究学会制定的指南中，恩替卡韦和富马酸替诺福韦酯(TDF)都是首选药物。</p><p>同样是由吉利德科学公司研发的乙肝抗病毒药物，富马酸丙酚替诺福韦片(TAF)比之前研发的富马酸替诺福韦酯(TDF)优越在哪些地方?重庆医科大学第二附属医院院长任红解释，在耐药性上，目前观察数据显示，截至96周这两个药物的耐药发生率都是0%。</p><p>“相比于TDF，给药后TAF在人体全身血浆中的平均暴露量降低了89%，人体原代肝细胞内产生的TAF-DP浓度是TDF的5倍，”任红分析，TAF给药后药物向肝脏聚集，所以TAF也可称为新型“靶向肝脏”乙肝治疗药物。因此从剂量上看，达到同样的药效，TAF的剂量只有TDF的十分之一。</p><p>“还有一点就是，相比于TDF，TAF对肾功能、对髋部和脊柱骨密度的影响更小。”任红说，这一点对于年龄在60岁以上，或者伴有骨病或“肾功能改变”的患者来说尤其需要考虑。</p><p>价格因素，成为新药可及难题</p><p>“价格是关键因素。”任红在回答澎湃新闻对新药富马酸丙酚替诺福韦片可及性影响因素时表示，新获批的富马酸丙酚替诺福韦片在功效上将来一定会替代原来的富马酸替诺福韦酯，但这还需要一段时间。</p><p>对于中国许多乙肝患者来说，替诺福韦一代产品富马酸替诺福韦酯也是一个新药。虽然2013年该药就获批，但当时的定价让许多乙肝患者承受不起。直到2016年，国家启动第一次药价谈判，富马酸替诺福韦酯成为当时入选的三个药品之一，而且还是三个谈判成功药品中降价幅度最大的药品。根据谈判结果，富马酸替诺福韦酯月均药品费用从1500元降至490元，价格降幅为67%。</p><p>随后富马酸替诺福韦酯在各地成功纳入医保，这也大大提高了富马酸替诺福韦酯的可及性。</p><p>“到明年1月份我们会正式公布药品价格，我们在中国定价的原则是要根据经济发展水平和现状来制定一个合理的价格，毕竟这个药刚进入中国市场，会是一个全自费药物。我们也期望未来有机会和政府合作，能够通过运用价格谈判的模式进入国家医保，来提高药品的可及性。“吉利德全球副总裁、中国区总经理罗永庆在回答记者药品定价时表示。</p><p>澎湃新闻通过查询美国药品比价网站goodrx发现，一瓶30片的富马酸丙酚替诺福韦片在美国上市的价格为1100美元左右，这算下来服用该药，患者每月月均药品费将会超过7000元人民币。</p><p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n</p><p>“中国(价格)不会那么高，但比较国产替诺福韦或恩替卡韦，(乙肝新药)可及性就是问题了。“任红对澎湃新闻表示。</p>","createTime":1544771949000,"ikey":"乙肝","isLink":"0","netWorkMark":"","networkTitle":"重磅！五年来首个乙肝新药上市","title":"重磅！五年来首个乙肝新药上市","url":"","source":"澎湃新闻","parentTypeID":21,"healthAdvisoryID":"543","releaseTime":"2018-12-14 15:03:51.0","converUrl":"http://img1.ak1ak1.com:90/a/2018/12/14/1544771911253.jpg","picUrl":"","picUrlLinks":"","linkillness":"38","digest":"目前在国内外临床上更广泛使用的药物为恩替卡韦和富马酸替诺福韦酯(TDF)，这两个药物在药效和耐药性方面都远胜于其他三个药物，因此不管在美国还是欧洲的肝病研究学会制定的指南中，恩替卡韦和富马酸替诺福韦酯(TDF)都是首选药物。"}],
        artListsIndex: 0,//当前文章
      }
    },
    computed: {
      top() {
        return -this.artListsIndex * 0.5625 + 'rem';
      },
    },
    filters: {
      //文章Class
      artClassFilter ( index ){
        var curIndex = index+1;

        if( curIndex%2 == 0 ) {
          return 'newImg-2';
        }else{
          return 'newImg-1';
        }
      },
    },
    mounted() {
      let topTimer = null;
      let newsLength = this.artLists.length;

      if(newsLength>0){
        topTimer = setInterval(()=>{
          if(this.artListsIndex>=newsLength-2){
            this.artListsIndex = 0;
            return
          }
          this.artListsIndex++;
        }, 3000);
      }
    },
  }
</script>

<style scoped lang="scss">

  /*** information ***/
  .information {
    /*height: 1.09375rem;*/
    height: 42px;
    font-size: 0;
    margin-bottom: 12px;
  }
  .information>* {
    font-size: 14px;
    position: relative;
  }
  .information_img {
    width: 52px;
    height: 42px;
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -23px -23px;
  }
  .information_liist {
    color: #555555;
    font-size: 14px;
    width: 258px;
    height: 42px;
    overflow: hidden;
  }
  .information_liist ul {
    position: relative;
    top: 0;
    transition: top 0.3s ease-out;
  }
  .information_liist li {
    line-height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 24px;
    padding-right: 24px;
  }
  .information_liist li>a {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .newImg-1 {
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -37.5px -80px;
  }
  .newImg-2 {
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -37.5px -112px;
  }
  .information_more {
    width: 37.5px;
    height: 42px;
    color: #a7a7a7;
    float: right;
  }
  .information_more a {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: url('~assets/images/arr_r1.png');
    background-repeat: no-repeat;
    background-position: right center;
    -webkit-background-size: 7px auto;
    background-size: 7px auto;
    color: #a7a7a7;
    font-size: 12px;
  }

</style>
