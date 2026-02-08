#include <iostream>

int main()
{
    int override{ 10 };
    int final{ override - 3 };

    std::cout << final << '\n';
    return 0;
}
