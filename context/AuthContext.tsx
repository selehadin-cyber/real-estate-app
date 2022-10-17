import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
  } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../config/firebase'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
          //anything else you want to happen when the user signs in
        } else {
          setUser(null)
          //anything else you want to happen when the user signs out
        }
        setLoading(false)
      })
      return () => unsubscribe()
    }, [])
  
    const signUp = (email: string, password: string, displayName: string) => {
      return createUserWithEmailAndPassword(auth, email, password).then(
        (cred) => {
          {
            setDoc(doc(database, 'user', cred.user.uid), {
              userName: displayName,
              fav: [],
            })
          }
        }
      )
    }
  
    const logIn = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    const logOut = async () => {
      setUser(null)
      await signOut(auth)
    }

    console.log(signUp)
    return (
        <AuthContext.Provider
          value={{
            user,
            logIn,
            signUp,
            logOut,
            
          }}
        >
          {children}
        </AuthContext.Provider>
      )
    }