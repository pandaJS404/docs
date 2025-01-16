import{_ as n,c as a,ao as p,o as l}from"./chunks/framework.ksZrIqzs.js";const e="/docs/img/2024/04/13/20241026_001.png",i="/docs/img/2024/04/13/20241026_005.png",r="/docs/img/2024/04/13/20241026_002.png",c="/docs/img/2024/04/13/20241026_003.png",b="/docs/img/2024/04/13/20241026_004.png",y=JSON.parse('{"title":"echarts偏移","description":"echarts偏移 折线图偏移 折线图柱状图中心对齐","frontmatter":{"title":"echarts偏移","description":"echarts偏移 折线图偏移 折线图柱状图中心对齐","author":"PandaJS","date":"2024/04/13 18:18","categories":["BUG 踩坑集"],"tags":["JavaScript","echarts"]},"headers":[],"relativePath":"categories/issues/2024/04/13/echarts偏移.md","filePath":"categories/issues/2024/04/13/echarts偏移.md","lastUpdated":1729948701000}'),m={name:"categories/issues/2024/04/13/echarts偏移.md"};function t(u,s,o,d,g,h){return l(),a("div",null,s[0]||(s[0]=[p('<h1 id="echarts-偏移-折线图偏移-折线图柱状图中心对齐" tabindex="-1">echarts 偏移 折线图偏移 折线图柱状图中心对齐 <a class="header-anchor" href="#echarts-偏移-折线图偏移-折线图柱状图中心对齐" aria-label="Permalink to &quot;echarts 偏移 折线图偏移 折线图柱状图中心对齐&quot;">​</a></h1><p><img src="'+e+'" alt="image" lang="zh-CN" data-fancybox="gallery"></p><p>折线图柱状图堆叠默认对齐是在柱状图中心，但是多个柱状图就会导致不在对应柱状图的中心 官方也没有提供折线图偏移 API，只有 symbolOffset 属性来偏移自定义的矢量路径或者图片，线无法偏移</p><p><img src="'+i+`" alt="image" lang="zh-CN" data-fancybox="gallery"></p><h2 id="解决方案-解决思路是动态增加一个隐藏-x-轴-设置-show-false" tabindex="-1">解决方案：解决思路是动态增加一个隐藏 x 轴，设置 show，false <a class="header-anchor" href="#解决方案-解决思路是动态增加一个隐藏-x-轴-设置-show-false" aria-label="Permalink to &quot;解决方案：解决思路是动态增加一个隐藏 x 轴，设置 show，false&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>  xAxis: [</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      type: &#39;value&#39;,</span></span>
<span class="line"><span>      show: false</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>但是增加了 legend 显示隐藏图表之后，柱状图消失会影响展示效果，所以对 legend 事件监听，重新设置偏移量</p><p><img src="`+r+'" alt="image" lang="zh-CN" data-fancybox="gallery"><img src="'+c+'" alt="image" lang="zh-CN" data-fancybox="gallery"><img src="'+b+`" alt="image" lang="zh-CN" data-fancybox="gallery"></p><h2 id="完整代码" tabindex="-1">完整代码 <a class="header-anchor" href="#完整代码" aria-label="Permalink to &quot;完整代码&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>option = {</span></span>
<span class="line"><span>  tooltip: {</span></span>
<span class="line"><span>    trigger: &#39;axis&#39;,</span></span>
<span class="line"><span>    axisPointer: {</span></span>
<span class="line"><span>      type: &#39;cross&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  legend: {</span></span>
<span class="line"><span>    data: [&#39;柱1&#39;, &#39;柱2&#39;, &#39;线1&#39;, &#39;线2&#39;]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  xAxis: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      type: &#39;category&#39;,</span></span>
<span class="line"><span>      data: [</span></span>
<span class="line"><span>        &#39;1月&#39;,</span></span>
<span class="line"><span>        &#39;2月&#39;,</span></span>
<span class="line"><span>        &#39;3月&#39;,</span></span>
<span class="line"><span>        &#39;4月&#39;,</span></span>
<span class="line"><span>        &#39;5月&#39;,</span></span>
<span class="line"><span>        &#39;6月&#39;,</span></span>
<span class="line"><span>        &#39;7月&#39;,</span></span>
<span class="line"><span>        &#39;8月&#39;,</span></span>
<span class="line"><span>        &#39;9月&#39;,</span></span>
<span class="line"><span>        &#39;10月&#39;,</span></span>
<span class="line"><span>        &#39;11月&#39;,</span></span>
<span class="line"><span>        &#39;12月&#39;</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>      axisPointer: {</span></span>
<span class="line"><span>        type: &#39;shadow&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  yAxis: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      type: &#39;value&#39;,</span></span>
<span class="line"><span>      name: &#39;水量&#39;,</span></span>
<span class="line"><span>      min: 0,</span></span>
<span class="line"><span>      max: 250,</span></span>
<span class="line"><span>      interval: 50,</span></span>
<span class="line"><span>      axisLabel: {</span></span>
<span class="line"><span>        formatter: &#39;{value} ml&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  series: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      name: &#39;柱1&#39;,</span></span>
<span class="line"><span>      type: &#39;bar&#39;,</span></span>
<span class="line"><span>      data: [</span></span>
<span class="line"><span>        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>      z: 1</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      name: &#39;柱2&#39;,</span></span>
<span class="line"><span>      type: &#39;bar&#39;,</span></span>
<span class="line"><span>      data: [</span></span>
<span class="line"><span>        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>      z: 1</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      xAxisIndex: 1,</span></span>
<span class="line"><span>      name: &#39;线1&#39;,</span></span>
<span class="line"><span>      type: &#39;line&#39;,</span></span>
<span class="line"><span>      itemStyle: {</span></span>
<span class="line"><span>        normal: {</span></span>
<span class="line"><span>          lineStyle: {</span></span>
<span class="line"><span>            type: &#39;solid&#39; //&#39;dotted&#39;虚线 &#39;solid&#39;实线</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      data: [</span></span>
<span class="line"><span>        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      xAxisIndex: 1,</span></span>
<span class="line"><span>      name: &#39;线2&#39;,</span></span>
<span class="line"><span>      type: &#39;line&#39;,</span></span>
<span class="line"><span>      itemStyle: {</span></span>
<span class="line"><span>        normal: {</span></span>
<span class="line"><span>          lineStyle: {</span></span>
<span class="line"><span>            type: &#39;solid&#39;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      data: [</span></span>
<span class="line"><span>        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 增加了一个隐藏的x轴，用来控制线图的点的位置</span></span>
<span class="line"><span>option.xAxis[1] = {</span></span>
<span class="line"><span>  type: &#39;value&#39;,</span></span>
<span class="line"><span>  max: option.xAxis[0].data.length * 100,</span></span>
<span class="line"><span>  show: false</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>option.series[2].data = option.series[2].data.map((x, i) =&gt; [30 + i * 100, x]);</span></span>
<span class="line"><span>option.series[3].data = option.series[3].data.map((x, i) =&gt; [70 + i * 100, x]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>myChart.on(&#39;legendselectchanged&#39;, function (params) {</span></span>
<span class="line"><span>  const option = this.getOption();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const show = Object.entries(params.selected)</span></span>
<span class="line"><span>    .filter((i) =&gt; i[0].indexOf(&#39;柱&#39;) &gt; -1)</span></span>
<span class="line"><span>    .filter((i) =&gt; i[1]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const len = show.length;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (len &gt; 0 &amp;&amp; len &lt; 3) {</span></span>
<span class="line"><span>    option.series[2].data = option.series[2].data.map((x, i) =&gt; [</span></span>
<span class="line"><span>      (len == 1 ? 50 : 30) + i * 100,</span></span>
<span class="line"><span>      x[1]</span></span>
<span class="line"><span>    ]);</span></span>
<span class="line"><span>    option.series[3].data = option.series[3].data.map((x, i) =&gt; [</span></span>
<span class="line"><span>      (len == 1 ? 50 : 70) + i * 100,</span></span>
<span class="line"><span>      x[1]</span></span>
<span class="line"><span>    ]);</span></span>
<span class="line"><span>    this.setOption({</span></span>
<span class="line"><span>      series: option.series</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br></div></div>`,10)]))}const f=n(m,[["render",t]]);export{y as __pageData,f as default};
