class CustomListener {

    // Collision event functions!
    BeginContact(contact) {
      // Get both fixtures
      let f1 = contact.GetFixtureA();
      let f2 = contact.GetFixtureB();
      // Get both bodies
      let b1 = f1.GetBody();
      let b2 = f2.GetBody();
  
      // Get our objects that reference these bodies
      let o1 = b1.GetUserData();
      let o2 = b2.GetUserData();
  
      if (o1 instanceof Ball && o2 instanceof Ball) {
          if (o1.status==1 || o2.status==1) {
            o1.change();
            o2.change();
          }
      }
    }
  
    // Objects stop touching each other
    EndContact(contact) {};
  
    PreSolve(contact, manifold) {};
  
    PostSolve(contact, manifold) {};
  }