import React from 'react'


//Component Directory
import Header from '../components/header'
import NewsList from '../components/newsList'
import Pagination from '../components/pagination'
import Loading from '../components/loading'


import News,{ newsCategory } from '../news'
const news = new News(newsCategory.technology)



class App extends React.Component {
  state={
    data:{},
    isLoading: true
  }

  //React Reference
  aboutResult = React.createRef()
  //searchRef = React.createRef()
  CbRef = null
  itemRefList = []

 
  componentDidMount(){
    news.getNews()
        .then((data)=>{
          this.setState({ data, isLoading:false })
        })
        .catch((e)=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        });

        //use Ref
        //console.dir(this.aboutResult.current)
        //this.searchRef.current.focus()
        //console.dir(this.searchRef.current)
        console.log(this.CbRef)
        console.log(this.itemRefList)
  }

  goToTop = ()=>{
    window.scroll(0, this.aboutResult.current.scrollTop)
  }

  next = () =>{
    if(this.state.data.isNext)(
      this.setState({ isLoading: true })
    )

    news.next()
        .then(data=>{
          this.setState({ data, isLoading:false })
        })
        .catch( e=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        })
  }

  prev = () =>{
    if(this.state.data.isPrevious)(
      this.setState({ isLoading: true })
    )

    news.prev()
        .then(data=>{
          this.setState({ data, isLoading:false })
        })
        .catch( e=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        })
  }

  handlePageChange = value =>{
    this.setState({
      data:{
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }

  goToPage = ()=> {
    this.setState({ isLoading: true })
    news.setCurrentPage(this.state.data.currentPage)
        .then((data)=>{
          this.setState({ data, isLoading:false })
        })
        .catch((e)=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        })
  }

  changeCategory = category=>{
    this.setState({isLoading:true})
    news.changeCategory(category)
        .then(data=>{
          this.setState({ data, isLoading:false })
        })
        .catch(e=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        })
  }

  search = searchterm=>{
    this.setState({isLoading:true})
    news.changeCategory(searchterm)
        .then(data=>{
          this.setState({ data, isLoading:false })
        })
        .catch(e=>{
          console.log(e)
          alert('Something Went wrong')
          this.setState({ isLoading: false })
        })
  }



  render(){
    const{
      article,
      isPrevious,
      isNext,
      category, 
      totalResults,
      currentPage,
      totalPage
    } = this.state.data
     
    return (
      <div className="App">
        <div className="container">
            
            <Header
              category= {category}
              changeCategory={this.changeCategory}
              search={this.search}
              ref={this.searchRef}
            /> 

            <div ref={this.aboutResult} className='d-flex'>
                <p ref={(el)=> this.CbRef = el} className='text-black-50'>
                    About {totalResults} results found
                </p>
                <p className='text-black-50 ml-auto'>
                    {currentPage} Page of {totalPage}
                </p>
            </div>

            { this.state.isLoading ? 
            (
                <Loading/>
            ):
            (
                <div>
                    <NewsList
                      news={article}
                      ref={this.itemRefList}
                    /> 
                  
                    <Pagination
                      next={this.next}
                      prev={this.prev}
                      isPrevious={isPrevious}
                      isNext={isNext}
                      totalPage={totalPage}
                      currentPage={currentPage}
                      handlePageChange={this.handlePageChange}
                      goToPage={this.goToPage}
                    />
                </div>

            )}

           <div className='d-flex'>
           <button
              className='btn btn-secondary my-5 ml-auto'
              onClick={this.goToTop}
            >
              Go to Top
            </button>
           </div>

            

        </div>
      </div>
    );
  }
}

export default App;
