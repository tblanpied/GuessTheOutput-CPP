#include <iostream>

int main()
{
    char buf[] { "abcd" };

    std::cout << sizeof(buf) << ' ' << sizeof("abcd") << '\n';
    return 0;
}
