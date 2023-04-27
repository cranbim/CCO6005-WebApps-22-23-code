using UnityEngine;

public class TreeDataUI : MonoBehaviour
{

    private TreeData myTreeData;

    void Start()
    {
        myTreeData = new TreeData();
        myTreeData.treeFamilyName = "Dave's Tree";
        myTreeData.treeSize = 3;
        myTreeData.treeColour = 0;
    }

    void SubmitTreeData(){
        StartCoroutine(Upload(myTreeData.Stringify(), result => {
            Debug.Log(result);
        }));
    }

    IEnumerator Upload(string profile, System.Action<bool> callback = null)
    {
        using (UnityWebRequest request = new UnityWebRequest("http://localhost:3000/treedata", "POST"))
        {
            request.SetRequestHeader("Content-Type", "application/json");
            byte[] bodyRaw = Encoding.UTF8.GetBytes(profile);
            request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            request.downloadHandler = new DownloadHandlerBuffer();
            yield return request.SendWebRequest();

            if (request.isNetworkError || request.isHttpError)
            {
                Debug.Log(request.error);
                if(callback != null) 
                {
                    callback.Invoke(false);
                }
            }
            else
            {
                if(callback != null) 
                {
                    callback.Invoke(request.downloadHandler.text != "{}");
                }
            }
        }
    }
}


    