import React, { Component } from 'react'
import MyConsumer from "../context";
import Personel from './Personel';

class PersonelList extends Component {
    render() {
        return (
            <MyConsumer>
                {
                    value => {
                        const { personels } = value;
                        return (
                            <div>
                                {
                                    personels.map(personel => {
                                        return (
                                            <Personel
                                                key={personel.id}
                                                id={personel.id}
                                                name={personel.name}
                                                salary={personel.salary}
                                                department={personel.department}


                                            />
                                        )

                                    })
                                }
                            </div>
                        )
                    }
                }

            </MyConsumer>
        )






    }
}

export default PersonelList;

