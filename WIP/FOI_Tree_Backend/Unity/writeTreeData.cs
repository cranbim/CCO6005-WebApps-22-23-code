using UnityEngine;

public class TreeDataUI : MonoBehaviour
{

    private TreeData myTreeData;
    private string dataURL="http://localhost:3000/treedata";


    void Start()
    {
        myTreeData = new TreeData();
        myTreeData.treeName = "Dave's Tree";
        myTreeData.treeShape = 3;
        myTreeData.treeColour = 1;
        SubmitTreeData();
    }

    void SubmitTreeData(){
        StartCoroutine(Upload(myTreeData.Stringify(), result => {
            Debug.Log(result);
        }));
    }

    IEnumerator Upload(string stringifiedTreeData, System.Action<bool> callback = null)
    {
        using (UnityWebRequest request = new UnityWebRequest("http://localhost:3000/treedata", "POST"))
        {
            request.SetRequestHeader("Content-Type", "application/json");
            byte[] bodyRaw = Encoding.UTF8.GetBytes(stringifiedTreeData);
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


    