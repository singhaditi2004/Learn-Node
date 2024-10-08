import http from 'http'

const server = http.createServer((req,res)=>{
   
   // res.writeHead(200,{'Content-Type':'text/html'});
    //res.write('Hello World');
    res.setHeader('Content-Type','text/plain')
    res.end();
});

server.listen(8000,()=>{
    console.log('Server is running on port 8000');
})