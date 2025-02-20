import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Grid, GridColumn, Progress } from 'semantic-ui-react';
import spacetime from 'spacetime';
import Web3 from 'web3'
import { abi, tokenContractAddress,client_token, tokens } from '../../Data';

function TokenUnit(props) {
    const { user,fetchQuestion,progress,lastAttempt,count} = props;
    const { href,title,id,token,_id} = props.chapter;
    const history = useHistory();
    const [now,setNow] = useState(null);
    const {userAddress} = user;

    useEffect(()=>{
        let t = setTimeout(()=>{
            setNow(spacetime.now());
        },1000);
        return ()=>{
            clearTimeout(t);
        }
    },[now])

    const canPlay = ()=>{
        let status = false
        if(lastAttempt && now){
            let dt = spacetime(lastAttempt,'utc');
            let nextAttempt = dt.add(12,'hour');
            if(now.isAfter(nextAttempt)){
                status = false;
            }else{
                status = true;
            }
        }
        if(title != tokens[0].title){
            status = true
        }
        return status;   
    }

    const beforeCooldown = ()=>{
        if(lastAttempt&&now){
            let dt = spacetime(lastAttempt,'utc');
            let nextAttempt = dt.add(12,'hour');
            if(now.isAfter(nextAttempt)){
                return ''
            }else{
                return 'Cool Down ' +now.since(nextAttempt).precise
            }
        }
        return ''
    }
    const handlePlay = async(e)=>{
        // const web3 = new Web3(Web3.givenProvider);
        // const contract = new web3.eth.Contract(abi,tokenContractAddress);
        try{
            // const result1 = await contract.methods.setApprovalForAll(tokenContractAddress,true).send({from:userAddress});
            // const result2 = await contract.methods.safeTransferFrom(userAddress,client_token,token,1,0).call();
            // fetchQuestion(id);
            if(count>0){
            history.push(`/game/${_id}`)
            } else{
                window.open(
                  "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974385379743367268"
                );
            }
        }catch(err){
            alert(err.message)
        }
    }
    return (
        <Grid.Row verticalAlign="middle">
            <Grid.Column width={3}>
                <a href={href}>{title}</a>
            </Grid.Column>
            <Grid.Column>{count}</Grid.Column>
            <Grid.Column width={5} >{ <Progress color="blue" value={ parseFloat( progress*100).toPrecision(2)} total={100}  progress='percent' />}</Grid.Column>
            <GridColumn >
                    <Button disabled={canPlay()} primary size="mini" onClick={handlePlay}>
                        {title != tokens[0].title? "Coming Soon" : (count>0? "Play" : "Buy") }
                    </Button>
            </GridColumn>
            <GridColumn width={4}>
                {beforeCooldown()}
            </GridColumn>
        </Grid.Row>
    )
}
const mapStateToProps  = (state)=>{
    return {
        user:state.global.user || { userAddress:''},
    }
}

export default connect(mapStateToProps,null)(TokenUnit);