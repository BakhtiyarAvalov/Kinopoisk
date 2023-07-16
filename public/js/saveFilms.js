function saveToWatch(id){
    axios.post('/api/films/save', {id}).then(data =>{
        if (data.stayus == 200){
          alert(data.data)
          location.reload()  
        }
    })
}