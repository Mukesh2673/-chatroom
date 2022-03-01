<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 bg-primary">
                <div class="box">
                    <div>
                        <h5>My Chats</h5>
                    </div>
                    <div>
                        <button class="btn btn-dark">Add New Group User +</button>    
                    </div>
                </div>        
            </div>
            
            <div class="col-md-7 bg-danger box">
                Guest User
            </div>
        </div>
    </div>
</template>
<style scoped>

.btn{
float: right;

}
.box{
    display: flex;
    justify-content: space-between;
}

</style>